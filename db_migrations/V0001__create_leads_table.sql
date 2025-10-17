-- Создание таблицы для хранения заявок
CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(20) NOT NULL,
    city VARCHAR(100),
    source VARCHAR(50),
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    form_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индекс для быстрого поиска по дате
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- Индекс для поиска по источнику
CREATE INDEX idx_leads_source ON leads(source);