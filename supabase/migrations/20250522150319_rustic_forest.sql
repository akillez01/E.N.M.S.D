/*
  # Setup Admin User and Sample Data

  1. Changes
    - Set up initial admin user
    - Add sample videos
    - Add sample events
    - Add sample blog posts
*/

-- Set admin role for specific user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'achilles.oliveira.souza@gmail.com',
  crypt('012345', gen_salt('bf')),
  now(),
  now(),
  now()
) ON CONFLICT (email) DO NOTHING;

-- Set admin role in profiles
INSERT INTO public.profiles (id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'achilles.oliveira.souza@gmail.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- Sample Videos
INSERT INTO videos (title, description, youtube_id, thumbnail, category, has_subtitles, has_audio_description) VALUES
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
INSERT INTO events (title, description, date, location, image_url) VALUES
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

-- Sample Blog Posts
INSERT INTO blog_posts (title, content, author_id, published, slug)
SELECT 
  'A História dos Hinos',
  'Os hinos do Santo Daime carregam uma rica história de espiritualidade e conexão com a natureza...',
  id,
  true,
  'a-historia-dos-hinos'
FROM auth.users
WHERE email = 'achilles.oliveira.souza@gmail.com';