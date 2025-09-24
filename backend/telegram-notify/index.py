import json
import os
import requests
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Отправляет уведомление в Telegram о новой заявке на оценку автомобиля
    Args: event - данные запроса с информацией об автомобиле
          context - контекст выполнения функции
    Returns: HTTP ответ об успешной отправке или ошибке
    """
    method: str = event.get('httpMethod', 'POST')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    # Получаем данные из формы
    body_data = json.loads(event.get('body', '{}'))
    
    # Проверяем обязательные поля
    required_fields = ['brand', 'model', 'year', 'phone']
    for field in required_fields:
        if not body_data.get(field):
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': f'Поле {field} обязательно для заполнения'})
            }
    
    # Получаем токен и chat_id из переменных окружения
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Telegram не настроен. Обратитесь к администратору.'})
        }
    
    # Формируем сообщение
    message = f"""🚗 Новая заявка на оценку автомобиля!

📋 Данные автомобиля:
• Марка: {body_data['brand']}
• Модель: {body_data['model']}
• Год: {body_data['year']}
• Пробег: {body_data.get('mileage', 'Не указан')} км
• Состояние: {body_data.get('condition', 'Не указано')}

📞 Контакт клиента: {body_data['phone']}

⏰ Время заявки: {context.request_id}"""
    
    # Отправляем сообщение в Telegram
    telegram_api_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    
    telegram_data = {
        'chat_id': chat_id,
        'text': message,
        'parse_mode': 'Markdown'
    }
    
    try:
        response = requests.post(telegram_api_url, data=telegram_data, timeout=10)
        
        if response.status_code == 200:
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True, 'message': 'Заявка успешно отправлена!'})
            }
        else:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Ошибка отправки в Telegram'})
            }
            
    except requests.exceptions.RequestException:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Ошибка соединения с Telegram'})
        }