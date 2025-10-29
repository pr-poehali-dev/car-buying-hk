import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Import ads to Yandex.Direct via API
    Args: event with httpMethod, body (campaign data)
          context with request_id
    Returns: HTTP response with import results
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'POST':
        token = os.environ.get('YANDEX_DIRECT_TOKEN', '')
        
        if not token:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': 'YANDEX_DIRECT_TOKEN not configured',
                    'message': 'Please add Yandex.Direct OAuth token to project secrets'
                })
            }
        
        body_data = json.loads(event.get('body', '{}'))
        campaign_type = body_data.get('campaignType', 'bitye')
        
        campaigns_config = {
            'bitye': {
                'name': 'Выкуп битых авто | Хабаровск',
                'url': 'https://avtovykupkhb27.ru/vykup-bityh-avto',
                'headlines': [
                    'Выкуп битых авто в Хабаровске за 15 минут',
                    'Купим битое авто после ДТП дорого',
                    'Выкуп разбитых авто — деньги сразу',
                    'Битое авто? Выкупим в день обращения!',
                    'Выкуп авто после ДТП — честная оценка',
                    'Купим разбитое авто в любом состоянии',
                    'Выкуп битых машин — +10% к цене',
                    'Срочно продать битое авто? Звоните!'
                ],
                'texts': [
                    'Купим ваш битый автомобиль в любом состоянии. Помятые, разбитые, не на ходу — берём всё. Оценка за 5 минут, деньги сразу наличными. Выезжаем по всему краю.',
                    'Срочный выкуп авто после ДТП по рыночной цене. Честная оценка без торга. Оформление документов берём на себя. Деньги сразу на руки. Звоните +7 984 177-15-88.'
                ]
            },
            'kredit': {
                'name': 'Выкуп кредитных авто | Хабаровск',
                'url': 'https://avtovykupkhb27.ru/vykup-kreditnyh-avto',
                'headlines': [
                    'Выкуп кредитных авто в Хабаровске',
                    'Купим авто в кредите — погасим долг',
                    'Продать кредитное авто за 15 минут',
                    'Выкуп авто с обременением — поможем',
                    'Машина в кредите? Выкупим сегодня!',
                    'Закроем кредит и купим ваше авто',
                    'Выкуп кредитных машин — без проблем',
                    'Избавим от кредита за 1 день'
                ],
                'texts': [
                    'Выкуп автомобилей в кредите по всему Хабаровскому краю. Погашаем кредит в банке, оформляем все документы. Разница между стоимостью авто и долгом — вам на руки.',
                    'Помогаем избавиться от кредитного авто за 1 день. Работаем с любыми банками края. Получаем справку об остатке долга, закрываем обременение. Деньги сразу.'
                ]
            },
            'srochno': {
                'name': 'Срочный выкуп авто | Хабаровск',
                'url': 'https://avtovykupkhb27.ru/srochnyy-vykup-avto',
                'headlines': [
                    'Срочный выкуп авто за 15 минут',
                    'Нужны деньги сегодня? Выкупим авто!',
                    'Купим автомобиль прямо сейчас',
                    'Выкуп авто в день обращения — 24/7',
                    'Продать машину срочно в Хабаровске',
                    'Деньги за авто сразу на руки',
                    'Быстрый выкуп авто — 5 минут оценка',
                    'Срочно продать машину дорого'
                ],
                'texts': [
                    'Срочно нужны деньги? Выкупим ваш автомобиль за 15 минут! Оценка за 5 минут по фото или при осмотре. Деньги наличными или переводом сразу после оформления.',
                    'Быстрый выкуп любых авто в Хабаровске и крае. Приезжаем в течение часа. Минимум документов, максимум скорости. Честная рыночная цена без торга. Звоните!'
                ]
            }
        }
        
        campaign_data = campaigns_config.get(campaign_type)
        
        if not campaign_data:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': 'Invalid campaign type',
                    'message': f'Unknown campaign type: {campaign_type}'
                })
            }
        
        import requests
        
        api_url = 'https://api.direct.yandex.com/json/v5/campaigns'
        
        headers = {
            'Authorization': f'Bearer {token}',
            'Accept-Language': 'ru',
            'Content-Type': 'application/json'
        }
        
        campaign_payload = {
            'method': 'add',
            'params': {
                'Campaigns': [{
                    'Name': campaign_data['name'],
                    'StartDate': '2025-10-29',
                    'TextCampaign': {
                        'BiddingStrategy': {
                            'Search': {
                                'BiddingStrategyType': 'HIGHEST_POSITION'
                            },
                            'Network': {
                                'BiddingStrategyType': 'SERVING_OFF'
                            }
                        },
                        'Settings': []
                    }
                }]
            }
        }
        
        try:
            response = requests.post(api_url, headers=headers, json=campaign_payload)
            response_data = response.json()
            
            if response.status_code == 200 and 'result' in response_data:
                campaign_id = response_data['result']['AddResults'][0]['Id']
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': True,
                        'campaignId': campaign_id,
                        'campaignName': campaign_data['name'],
                        'message': 'Campaign created successfully! Now add ads manually in Yandex.Direct interface.',
                        'headlines': campaign_data['headlines'],
                        'texts': campaign_data['texts'],
                        'url': campaign_data['url']
                    })
                }
            else:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': False,
                        'error': response_data,
                        'message': 'Failed to create campaign. Check token and permissions.'
                    })
                }
        
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': False,
                    'error': str(e),
                    'message': 'Internal server error'
                })
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'})
    }
