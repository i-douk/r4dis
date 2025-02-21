drop policy "Enable insert for authentication trigger" on "public"."users";

alter table "public"."followings" alter column "user_id" set data type uuid using "user_id"::uuid;

alter table "public"."followings" disable row level security;

alter table "public"."migrations" disable row level security;

alter table "public"."podcasters" drop column "password";

alter table "public"."podcasters" alter column "id" drop default;

alter table "public"."podcasters" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."podcasters" disable row level security;

alter table "public"."podcasts" alter column "podcaster_id" set data type uuid using "podcaster_id"::uuid;

alter table "public"."podcasts" disable row level security;

alter table "public"."subscriptions" alter column "podcaster_id" set data type uuid using "podcaster_id"::uuid;

alter table "public"."subscriptions" alter column "user_id" set data type uuid using "user_id"::uuid;

alter table "public"."subscriptions" disable row level security;

alter table "public"."users" alter column "id" drop default;

alter table "public"."users" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."users" alter column "podcaster_id" set data type uuid using "podcaster_id"::uuid;

alter table "public"."users" alter column "role" set default 'user'::enum_users_role;

drop sequence if exists "public"."podcasters_id_seq";

drop sequence if exists "public"."users_id_seq";

alter table "public"."podcasters" add constraint "podcasters_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."podcasters" validate constraint "podcasters_id_fkey";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."users" validate constraint "users_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    -- Insert the new user into public.users
    INSERT INTO public.users (
        id,              -- We'll use the auth.user id as our primary key
        email,
        username,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,
        NEW.email,
        -- Extract username from email if not provided
        COALESCE(NEW.raw_user_meta_data->>'username', 
                 SPLIT_PART(NEW.email, '@', 1)),
        NEW.created_at,
        NEW.created_at
    );
    RETURN NEW;
END;
$function$
;


