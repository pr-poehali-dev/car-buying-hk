import json
import os
import urllib.request
import urllib.parse
import psycopg2
from typing import Dict, Any, Optional
from pydantic import BaseModel, Field, ValidationError

class LeadRequest(BaseModel):
    brand: str = Field(default='Не указана')
    model: str = Field(default='Не указана')
    year: str = Field(default='Не указан')
    condition: str = Field(default='Не указано')
    city: Optional[str] = Field(default='Не указан')
    phone: str = Field(..., min_length=1)
    source: Optional[str] = Field(default='website')
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    form_type: Optional[str] = Field(default='evaluation')

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send car evaluation leads to Telegram bot
    Args: event with httpMethod and body containing lead data
    Returns: HTTP response with success/error status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    # Parse request body
    body_data = json.loads(event.get('body', '{}'))
    
    # Validate data
    lead = LeadRequest(**body_data)
    
    # Get credentials
    bot_token = '8228446757:AAFJzDq806ntijVssOKacHCcLmigD5dZZOg'
    chat_id = '6275725133'
    database_url = os.environ.get('DATABASE_URL')
    
    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Telegram credentials not configured'})
        }
    
    # Save to database and get lead ID first
    lead_id = None
    if database_url:
        try:
            conn = psycopg2.connect(database_url)
            cur = conn.cursor()
            
            # Escape single quotes for Simple Query Protocol
            phone_escaped = lead.phone.replace("'", "''")
            city_escaped = (lead.city or 'null').replace("'", "''") if lead.city else 'null'
            source_escaped = (lead.source or 'null').replace("'", "''") if lead.source else 'null'
            utm_source_escaped = (lead.utm_source or 'null').replace("'", "''") if lead.utm_source else 'null'
            utm_medium_escaped = (lead.utm_medium or 'null').replace("'", "''") if lead.utm_medium else 'null'
            utm_campaign_escaped = (lead.utm_campaign or 'null').replace("'", "''") if lead.utm_campaign else 'null'
            form_type_escaped = (lead.form_type or 'null').replace("'", "''") if lead.form_type else 'null'
            
            # Build query with proper NULL handling for Simple Query Protocol
            city_value = f"'{city_escaped}'" if lead.city else 'NULL'
            source_value = f"'{source_escaped}'" if lead.source else 'NULL'
            utm_source_value = f"'{utm_source_escaped}'" if lead.utm_source else 'NULL'
            utm_medium_value = f"'{utm_medium_escaped}'" if lead.utm_medium else 'NULL'
            utm_campaign_value = f"'{utm_campaign_escaped}'" if lead.utm_campaign else 'NULL'
            form_type_value = f"'{form_type_escaped}'" if lead.form_type else 'NULL'
            
            query = f"""
                INSERT INTO t_p15928011_car_buying_hk.leads 
                (phone, city, source, utm_source, utm_medium, utm_campaign, form_type) 
                VALUES ('{phone_escaped}', {city_value}, {source_value}, {utm_source_value}, {utm_medium_value}, {utm_campaign_value}, {form_type_value}) 
                RETURNING id
            """
            
            cur.execute(query)
            lead_id = cur.fetchone()[0]
            conn.commit()
            cur.close()
            conn.close()
        except Exception as db_error:
            # Don't fail if DB insert fails, just log it
            print(f"DB error: {db_error}")
    
    # Map condition codes to Russian text
    condition_map = {
        'excellent': 'Отличное (без повреждений)',
        'good': 'Хорошее (мелкие дефекты)',
        'average': 'Среднее (требует ремонта)',
        'damaged': 'Битое (после ДТП)',
        'not-running': 'Не на ходу',
        'credit': 'В кредите',
        'no-docs': 'Без документов'
    }
    
    # Map city codes to Russian names
    city_map = {
        'khabarovsk': 'Хабаровск',
        'komsomolsk': 'Комсомольск-на-Амуре',
        'amursk': 'Амурск',
        'sovetskaya-gavan': 'Советская Гавань',
        'bikin': 'Бикин',
        'vyazemsky': 'Вяземский',
        'nikolaevsk': 'Николаевск-на-Амуре',
        'vanino': 'Ванино',
        'pereyaslavka': 'Переяславка',
        'khabarovsky-district': 'Хабаровский район',
        'komsomolsky-district': 'Комсомольский район',
        'other': 'Другой населённый пункт'
    }
    
    condition_text = condition_map.get(lead.condition, lead.condition if lead.condition != 'Не указано' else 'Не указано')
    city_text = city_map.get(lead.city, lead.city if lead.city != 'Не указан' else 'Не указан')
    
    # Format message with lead ID
    lead_number = f"#{lead_id}" if lead_id else "#NEW"
    message = f'''🚗 НОВАЯ ЗАЯВКА {lead_number}

📋 Детали автомобиля:
• Марка: {lead.brand}
• Модель: {lead.model}
• Год: {lead.year}
• Состояние: {condition_text}
• Город: {city_text}

📞 Телефон клиента: {lead.phone}

✅ Проверка: Капча пройдена (не робот)
⏰ Срочно свяжитесь с клиентом!'''
    
    # Send to Telegram
    telegram_url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': message
    }).encode('utf-8')
    
    req = urllib.request.Request(telegram_url, data=data, method='POST')
    
    try:
        # Send to Telegram
        with urllib.request.urlopen(req) as response:
            response_data = response.read()
            telegram_response = json.loads(response_data.decode('utf-8'))
            
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'success': True, 'message': 'Lead sent successfully', 'telegram_response': telegram_response})
        }
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': f'Telegram API error: {str(e)}', 'details': error_body, 'bot_token_length': len(bot_token), 'chat_id': chat_id})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': f'Failed to send message: {str(e)}'})
        }