import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any
from pydantic import BaseModel, Field, ValidationError

class LeadRequest(BaseModel):
    brand: str = Field(default='Не указана')
    model: str = Field(default='Не указана')
    year: str = Field(default='Не указан')
    mileage: str = Field(default='Не указан')
    condition: str = Field(default='Не указано')
    phone: str = Field(..., min_length=1)

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
    
    # Telegram credentials (hardcoded temporarily until secrets are properly configured)
    bot_token = '8228446757:AAFJzDq806ntijVssOKacHCcLmigD5dZZOg'
    chat_id = '6275725133'
    
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
    
    # Format message
    message = f'''🚗 НОВАЯ ЗАЯВКА НА ОЦЕНКУ АВТОМОБИЛЯ

📋 Детали автомобиля:
• Марка: {lead.brand}
• Модель: {lead.model}
• Год: {lead.year}
• Пробег: {lead.mileage} км
• Состояние: {lead.condition}

📞 Телефон клиента: {lead.phone}

⏰ Срочно свяжитесь с клиентом!'''
    
    # Send to Telegram
    telegram_url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': message
    }).encode('utf-8')
    
    req = urllib.request.Request(telegram_url, data=data, method='POST')
    
    try:
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