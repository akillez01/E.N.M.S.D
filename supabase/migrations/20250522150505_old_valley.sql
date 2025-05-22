/*
  # Setup Admin User and Sample Data

  1. Changes
    - Create admin user and set role
    - Add sample videos with thumbnails
    - Add sample upcoming events
    - Create sample blog posts
    
  2. Security
    - Ensure admin user has proper permissions
    - Maintain data integrity with proper constraints
*/

-- First, ensure the user exists in auth.users
DO $$
DECLARE
  user_id uuid;
BEGIN
  -- Insert the user if they don't exist
  INSERT INTO auth.users (
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    aud,
    role
  ) VALUES (
    'achilles.oliveira.souza@gmail.com',
    crypt('012345', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    'authenticated',
    'authenticated'
  )
  ON CONFLICT (email) DO
  UPDATE SET encrypted_password = crypt('012345', gen_salt('bf'))
  RETURNING id INTO user_id;

  -- If we didn't get a user_id from the insert/update, fetch it
  IF user_id IS NULL THEN
    SELECT id INTO user_id FROM auth.users WHERE email = 'achilles.oliveira.souza@gmail.com';
  END IF;

  -- Ensure user has a profile with admin role
  INSERT INTO public.profiles (id, role)
  VALUES (user_id, 'admin')
  ON CONFLICT (id) DO UPDATE SET role = 'admin';

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

  -- Sample Blog Post
  INSERT INTO blog_posts (title, content, author_id, published, slug)
  VALUES (
    'A História dos Hinos',
    'Os hinos do Santo Daime carregam uma rica história de espiritualidade e conexão com a natureza...',
    user_id,
    true,
    'a-historia-dos-hinos'
  );
END $$;