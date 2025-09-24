import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправляет уведомления о новых заявках на оценку автомобилей в Telegram
    Args: event - dict with httpMethod, body, headers
          context - object with request_id, function_name attributes
    Returns: HTTP response dict with status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'isBase64Encoded': False,
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    # Get Telegram credentials
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Telegram credentials not configured'})
        }
    
    # Parse request body
    try:
        body_data = json.loads(event.get('body', '{}'))
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Invalid JSON'})
        }
    
    # Extract form data
    brand = body_data.get('brand', 'Не указана')
    model = body_data.get('model', 'Не указана')
    year = body_data.get('year', 'Не указан')
    mileage = body_data.get('mileage', 'Не указан')
    condition = body_data.get('condition', 'Не указано')
    phone = body_data.get('phone', 'Не указан')
    
    # Format message
    message = f"""🚗 НОВАЯ ЗАЯВКА НА ОЦЕНКУ АВТОМОБИЛЯ

📋 Детали автомобиля:
• Марка: {brand}
• Модель: {model}
• Год выпуска: {year}
• Пробег: {mileage} км
• Состояние: {condition}

📞 Контакт клиента: {phone}

⏰ Время заявки: {context.request_id}

#АвтоВыкуп #НоваяЗаявка"""
    
    # Send to Telegram
    telegram_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    
    data = {
        'chat_id': chat_id,
        'text': message,
        'parse_mode': 'HTML'
    }
    
    try:
        # Encode data
        encoded_data = urllib.parse.urlencode(data).encode('utf-8')
        
        # Create request
        req = urllib.request.Request(telegram_url, data=encoded_data, method='POST')
        req.add_header('Content-Type', 'application/x-www-form-urlencoded')
        
        # Send request
        with urllib.request.urlopen(req) as response:
            result = response.read().decode('utf-8')
            
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'message': 'Заявка успешно отправлена в Telegram'
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': False,
                'error': f'Ошибка отправки в Telegram: {str(e)}'
            })
        }