/*
  # Initial Schema Setup

  1. New Tables
    - users (handled by Supabase Auth)
    - articles
      - id (uuid, primary key)
      - title (text)
      - content (text)
      - category (text)
      - image_url (text)
      - author_id (uuid, references auth.users)
      - created_at (timestamp)
      - updated_at (timestamp)
    - sports_events
      - id (uuid, primary key)
      - title (text)
      - event_date (timestamp)
      - organization (text)
      - location (text)
      - status (text)
    - fighters
      - id (uuid, primary key)
      - name (text)
      - record (text)
      - weight_class (text)
      - organization (text)

  2. Security
    - Enable RLS on all tables
    - Set up read/write policies
*/

-- Articles table
CREATE TABLE articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  image_url text,
  author_id uuid REFERENCES auth.users,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Sports events table
CREATE TABLE sports_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  event_date timestamptz NOT NULL,
  organization text NOT NULL,
  location text,
  status text DEFAULT 'upcoming',
  created_at timestamptz DEFAULT now()
);

-- Fighters table
CREATE TABLE fighters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  record text NOT NULL,
  weight_class text NOT NULL,
  organization text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sports_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE fighters ENABLE ROW LEVEL SECURITY;

-- Policies for articles
CREATE POLICY "Anyone can read articles"
  ON articles FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Authors can create articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Policies for sports events
CREATE POLICY "Anyone can read events"
  ON sports_events FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Only admins can modify events"
  ON sports_events FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE email LIKE '%@mmahub.com'
  ));

-- Policies for fighters
CREATE POLICY "Anyone can read fighters"
  ON fighters FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Only admins can modify fighters"
  ON fighters FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE email LIKE '%@mmahub.com'
  ));