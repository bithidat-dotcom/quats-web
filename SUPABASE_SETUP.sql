-- Run this SQL in your Supabase Dashboard -> SQL Editor to create the jobs table

CREATE TABLE public.jobs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name text NOT NULL,
  job_title text NOT NULL,
  contact_number text NOT NULL,
  salary text NOT NULL,
  location text NOT NULL,
  employee_number text NOT NULL,
  description text NOT NULL,
  image_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Allow read access to everyone
CREATE POLICY "Allow public read access" 
ON public.jobs 
FOR SELECT 
USING (true);

-- Allow insert access to everyone (so users can post jobs)
CREATE POLICY "Allow public insert access" 
ON public.jobs 
FOR INSERT 
WITH CHECK (true);
