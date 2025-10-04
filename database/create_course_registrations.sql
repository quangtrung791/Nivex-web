-- Create course_registrations table
CREATE TABLE IF NOT EXISTS public.course_registrations (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    -- FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_course_registrations_course_id ON public.course_registrations(course_id);
CREATE INDEX IF NOT EXISTS idx_course_registrations_email ON public.course_registrations(email);

-- Add missing columns to courses table if they don't exist
-- ALTER TABLE public.courses 
-- ADD COLUMN IF NOT EXISTS start_date TIMESTAMP WITH TIME ZONE,
-- ADD COLUMN IF NOT EXISTS end_date TIMESTAMP WITH TIME ZONE,
-- ADD COLUMN IF NOT EXISTS link_zoom TEXT; 