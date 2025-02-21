

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."enum_active_user_sessions_role" AS ENUM (
    'user',
    'superuser',
    'admin'
);


ALTER TYPE "public"."enum_active_user_sessions_role" OWNER TO "postgres";


CREATE TYPE "public"."enum_users_role" AS ENUM (
    'user',
    'superuser',
    'admin'
);


ALTER TYPE "public"."enum_users_role" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."followings" (
    "id" integer NOT NULL,
    "user_id" integer NOT NULL,
    "podcast_id" integer NOT NULL,
    "starred" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."followings" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."followings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."followings_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."followings_id_seq" OWNED BY "public"."followings"."id";



CREATE TABLE IF NOT EXISTS "public"."migrations" (
    "name" character varying(255) NOT NULL
);


ALTER TABLE "public"."migrations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."podcasters" (
    "id" integer NOT NULL,
    "email" character varying(255) NOT NULL,
    "username" character varying(255) NOT NULL,
    "password" character varying(255) NOT NULL,
    "premium" boolean DEFAULT false,
    "verified" boolean DEFAULT false,
    "disabled" boolean DEFAULT false,
    "links" "text"[],
    "about" "text",
    "earnings" integer,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone NOT NULL,
    "subscriptioncount" integer DEFAULT 0 NOT NULL
);


ALTER TABLE "public"."podcasters" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."podcasters_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."podcasters_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."podcasters_id_seq" OWNED BY "public"."podcasters"."id";



CREATE TABLE IF NOT EXISTS "public"."podcasts" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "urls" character varying(255)[] NOT NULL,
    "transcribed" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone NOT NULL,
    "podcaster_id" integer,
    "followcount" integer DEFAULT 0 NOT NULL
);


ALTER TABLE "public"."podcasts" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."podcasts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."podcasts_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."podcasts_id_seq" OWNED BY "public"."podcasts"."id";



CREATE TABLE IF NOT EXISTS "public"."subscriptions" (
    "id" integer NOT NULL,
    "user_id" integer NOT NULL,
    "podcaster_id" integer NOT NULL,
    "paid" boolean DEFAULT false NOT NULL,
    "stipend" integer DEFAULT 0 NOT NULL,
    "frozen" boolean DEFAULT false NOT NULL,
    "comments" character varying(255)[]
);


ALTER TABLE "public"."subscriptions" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."subscriptions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."subscriptions_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."subscriptions_id_seq" OWNED BY "public"."subscriptions"."id";



CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" integer NOT NULL,
    "email" character varying(255) NOT NULL,
    "username" character varying(255) NOT NULL,
    "verified" boolean DEFAULT false,
    "disabled" boolean DEFAULT false,
    "role" "public"."enum_users_role",
    "avatar_url" character varying(255),
    "about" "text",
    "balance" integer,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone NOT NULL,
    "podcaster_id" integer,
    "podcast_id" integer
);


ALTER TABLE "public"."users" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."users_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."users_id_seq" OWNED BY "public"."users"."id";



ALTER TABLE ONLY "public"."followings" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."followings_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."podcasters" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."podcasters_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."podcasts" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."podcasts_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."subscriptions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."subscriptions_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."users" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."users_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."followings"
    ADD CONSTRAINT "followings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."followings"
    ADD CONSTRAINT "followings_user_id_podcast_id_key" UNIQUE ("user_id", "podcast_id");



ALTER TABLE ONLY "public"."migrations"
    ADD CONSTRAINT "migrations_pkey" PRIMARY KEY ("name");



ALTER TABLE ONLY "public"."podcasters"
    ADD CONSTRAINT "podcasters_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."podcasters"
    ADD CONSTRAINT "podcasters_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."podcasts"
    ADD CONSTRAINT "podcasts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_user_id_podcaster_id_key" UNIQUE ("user_id", "podcaster_id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."followings"
    ADD CONSTRAINT "followings_podcast_id_fkey" FOREIGN KEY ("podcast_id") REFERENCES "public"."podcasts"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."followings"
    ADD CONSTRAINT "followings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."podcasts"
    ADD CONSTRAINT "podcasts_podcaster_id_fkey" FOREIGN KEY ("podcaster_id") REFERENCES "public"."podcasters"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_podcaster_id_fkey" FOREIGN KEY ("podcaster_id") REFERENCES "public"."podcasters"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_podcast_id_fkey" FOREIGN KEY ("podcast_id") REFERENCES "public"."podcasts"("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_podcaster_id_fkey" FOREIGN KEY ("podcaster_id") REFERENCES "public"."podcasters"("id");



CREATE POLICY "Enable insert for authentication trigger" ON "public"."users" FOR INSERT TO "authenticated" WITH CHECK (((((("auth"."uid"())::"text")::"uuid")::"text")::integer = "id"));



ALTER TABLE "public"."followings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."migrations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."podcasters" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."podcasts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."subscriptions" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";




















































































































































































GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";


















GRANT ALL ON TABLE "public"."followings" TO "anon";
GRANT ALL ON TABLE "public"."followings" TO "authenticated";
GRANT ALL ON TABLE "public"."followings" TO "service_role";



GRANT ALL ON SEQUENCE "public"."followings_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."followings_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."followings_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."migrations" TO "anon";
GRANT ALL ON TABLE "public"."migrations" TO "authenticated";
GRANT ALL ON TABLE "public"."migrations" TO "service_role";



GRANT ALL ON TABLE "public"."podcasters" TO "anon";
GRANT ALL ON TABLE "public"."podcasters" TO "authenticated";
GRANT ALL ON TABLE "public"."podcasters" TO "service_role";



GRANT ALL ON SEQUENCE "public"."podcasters_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."podcasters_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."podcasters_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."podcasts" TO "anon";
GRANT ALL ON TABLE "public"."podcasts" TO "authenticated";
GRANT ALL ON TABLE "public"."podcasts" TO "service_role";



GRANT ALL ON SEQUENCE "public"."podcasts_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."podcasts_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."podcasts_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."subscriptions" TO "service_role";



GRANT ALL ON SEQUENCE "public"."subscriptions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."subscriptions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."subscriptions_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
