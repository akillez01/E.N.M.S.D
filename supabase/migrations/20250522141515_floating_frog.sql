/*
  # Initial Schema Setup

  1. New Tables
    - users (handled by Supabase Auth)
    - videos
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - youtube_id (text)
      - thumbnail (text)
      - created_at (timestamp)
      - category (text)
      - has_subtitles (boolean)
      - has_audio_description (boolean)
    - events
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - date (timestamp)
      - location (text)
      - image_url (text)
      - created_at (timestamp)
    - blog_posts
      - id (uuid, primary key)
      - title (text)
      - content (text)
      - author_id (uuid, references auth.users)
      - created_at (timestamp)
      - updated_at (timestamp)
      - published (boolean)
      - slug (text)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users and public access
*/

-- Videos Table
CREATE TABLE videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  youtube_id text NOT NULL,
  thumbnail text,
  created_at timestamptz DEFAULT now(),
  category text,
  has_subtitles boolean DEFAULT false,
  has_audio_description boolean DEFAULT false
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Videos are viewable by everyone"
  ON videos
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only authenticated users can insert videos"
  ON videos
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Events Table
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  date timestamptz NOT NULL,
  location text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by everyone"
  ON events
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only authenticated users can insert events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Blog Posts Table
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published boolean DEFAULT false,
  slug text UNIQUE NOT NULL
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published blog posts are viewable by everyone"
  ON blog_posts
  FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authors can manage their own posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());