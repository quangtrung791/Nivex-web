-- Create course_registrations table
CREATE TABLE IF NOT EXISTS wpun_course_registrations (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_course_registrations_course_id ON wpun_course_registrations(course_id);
CREATE INDEX IF NOT EXISTS idx_course_registrations_email ON wpun_course_registrations(email);
