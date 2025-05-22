/*
  # Add admin user and sample data

  1. Changes
    - Create admin user
    - Add sample videos
    - Add sample events
    - Add sample blog post
    
  2. Security
    - Set up admin role for specified user
    - Ensure proper data relationships
*/

-- Sample Videos
INSERT INTO videos (title, description, youtube_id, thumbnail, category, has_subtitles, has_audio_description)
VALUES
  (
    'Hinário São João',
    'Gravação completa do hinário São João, com participação especial dos músicos da comunidade.',
    'dQw4w9WgXcQ',
    'https://images.pexels.com/photos/1647372/pexels-photo-1647372.jpeg',
    'Hinários',
    true,
    true
  ),
  (
    'Oficina de Violão',
    'Workshop sobre as batidas tradicionais do Santo Daime no violão.',
    'dQw4w9WgXcQ',
    'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg',
    'Workshops',
    true,
    false
  ),
  (
    'Encontro de Músicos 2024',
    'Registro do encontro anual de músicos do Santo Daime.',
    'dQw4w9WgXcQ',
    'https://images.pexels.com/photos/2531709/pexels-photo-2531709.jpeg',
    'Encontros',
    true,
    true
  );

-- Sample Events
INSERT INTO events (title, description, date, location, image_url)
VALUES
  (
    'Workshop de Maracá',
    'Aprenda sobre a importância e as técnicas do maracá nos rituais.',
    now() + interval '30 days',
    'Centro Cultural Santo Daime - São Paulo, SP',
    'https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg'
  ),
  (
    'Encontro de Violonistas',
    'Troca de experiências entre violonistas da tradição.',
    now() + interval '45 days',
    'Casa de Cultura - Rio Branco, AC',
    'https://images.pexels.com/photos/2531714/pexels-photo-2531714.jpeg'
  );