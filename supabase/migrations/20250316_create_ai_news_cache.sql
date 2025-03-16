-- Create the ai_news_cache table
CREATE TABLE IF NOT EXISTS ai_news_cache (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  report TEXT NOT NULL,
  search_results TEXT NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create an index on last_updated for faster queries
CREATE INDEX IF NOT EXISTS idx_ai_news_cache_last_updated ON ai_news_cache(last_updated);

-- Add a comment to the table
COMMENT ON TABLE ai_news_cache IS 'Stores cached AI news reports to reduce API calls';
