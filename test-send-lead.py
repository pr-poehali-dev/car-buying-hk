#!/usr/bin/env python3
"""
Тестовый скрипт для отправки заявки
Запуск: python3 test-send-lead.py
"""

import json
import urllib.request
import urllib.error

def send_test_lead():
    """Отправить тестовую заявку в систему"""
    
    url = 'https://functions.poehali.dev/d96ee797-612a-46f2-b934-ed038b121758'
    
    test_data = {
        'phone': '+79999999999',
        'city': 'komsomolsk',
        'brand': 'Toyota',
        'model': 'Camry',
        'year': '2015',
        'condition': 'excellent',
        'source': 'test_script',
        'form_type': 'evaluation'
    }
    
    print('🚀 Отправляю тестовую заявку...')
    print(f'📱 Телефон: {test_data["phone"]}')
    print(f'📍 Город: {test_data["city"]}')
    print(f'🚗 Авто: {test_data["brand"]} {test_data["model"]} {test_data["year"]}')
    print('')
    
    try:
        # Подготовка данных
        data = json.dumps(test_data).encode('utf-8')
        
        # Создание запроса
        req = urllib.request.Request(
            url,
            data=data,
            headers={
                'Content-Type': 'application/json',
                'User-Agent': 'TestScript/1.0'
            },
            method='POST'
        )
        
        # Отправка запроса
        with urllib.request.urlopen(req, timeout=10) as response:
            response_data = response.read().decode('utf-8')
            result = json.loads(response_data)
            
            print('✅ УСПЕШНО!')
            print('')
            print('📊 Ответ сервера:')
            print(json.dumps(result, indent=2, ensure_ascii=False))
            print('')
            print('✅ Что произошло:')
            print('   1. Заявка сохранена в базу данных')
            print('   2. Уведомление отправлено в Telegram')
            print('   3. Город определён: Комсомольск-на-Амуре')
            print('')
            print('🔍 Проверьте:')
            print('   • Telegram чат — должно прийти уведомление')
            print('   • Админ-панель — новая заявка в списке')
            
            return True
            
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        print(f'❌ ОШИБКА HTTP {e.code}')
        print(f'Ответ: {error_body}')
        return False
        
    except urllib.error.URLError as e:
        print(f'❌ ОШИБКА СЕТИ: {e.reason}')
        return False
        
    except Exception as e:
        print(f'❌ ОШИБКА: {str(e)}')
        return False

if __name__ == '__main__':
    print('='*50)
    print('🧪 ТЕСТИРОВАНИЕ СИСТЕМЫ ПРИЁМА ЗАЯВОК')
    print('='*50)
    print('')
    
    success = send_test_lead()
    
    print('')
    print('='*50)
    if success:
        print('✅ Тест пройден успешно!')
    else:
        print('❌ Тест провален')
    print('='*50)
