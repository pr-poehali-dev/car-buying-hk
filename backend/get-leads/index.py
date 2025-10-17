import json
import os
import psycopg2
from typing import Dict, Any, List
from datetime import datetime, timedelta

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get leads statistics from database for admin panel
    Args: event with httpMethod and queryStringParameters (period, password)
    Returns: HTTP response with leads data and statistics
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    # Check password
    headers = event.get('headers', {})
    password = headers.get('X-Admin-Password') or headers.get('x-admin-password')
    
    if password != 'avto2025admin':
        return {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Unauthorized'})
        }
    
    # Get database connection
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Database not configured'})
        }
    
    # Get query parameters
    params = event.get('queryStringParameters', {}) or {}
    period = params.get('period', '7')  # days
    
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        # Calculate date range
        days_ago = int(period)
        date_from = datetime.now() - timedelta(days=days_ago)
        
        # Get leads
        cur.execute(
            "SELECT id, phone, city, source, utm_source, utm_medium, utm_campaign, form_type, created_at FROM leads WHERE created_at >= %s ORDER BY created_at DESC",
            (date_from,)
        )
        
        rows = cur.fetchall()
        leads: List[Dict[str, Any]] = []
        
        for row in rows:
            leads.append({
                'id': row[0],
                'phone': row[1],
                'city': row[2],
                'source': row[3],
                'utm_source': row[4],
                'utm_medium': row[5],
                'utm_campaign': row[6],
                'form_type': row[7],
                'created_at': row[8].isoformat() if row[8] else None
            })
        
        # Get statistics
        cur.execute(
            "SELECT COUNT(*) FROM leads WHERE created_at >= %s",
            (date_from,)
        )
        total_leads = cur.fetchone()[0]
        
        # Get today's leads
        today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        cur.execute(
            "SELECT COUNT(*) FROM leads WHERE created_at >= %s",
            (today,)
        )
        today_leads = cur.fetchone()[0]
        
        # Get leads by source
        cur.execute(
            "SELECT source, COUNT(*) FROM leads WHERE created_at >= %s GROUP BY source",
            (date_from,)
        )
        by_source = {row[0]: row[1] for row in cur.fetchall()}
        
        # Get leads by day
        cur.execute(
            "SELECT DATE(created_at) as day, COUNT(*) FROM leads WHERE created_at >= %s GROUP BY day ORDER BY day",
            (date_from,)
        )
        by_day = [{
            'date': row[0].isoformat() if row[0] else None,
            'count': row[1]
        } for row in cur.fetchall()]
        
        cur.close()
        conn.close()
        
        result = {
            'leads': leads,
            'statistics': {
                'total': total_leads,
                'today': today_leads,
                'period_days': days_ago,
                'by_source': by_source,
                'by_day': by_day
            }
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps(result)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': f'Database error: {str(e)}'})
        }
