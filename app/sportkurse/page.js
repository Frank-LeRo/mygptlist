'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import { translations } from '../../lib/translations';

export default function SportkursePage() {
  const [language, setLanguage] = useState('de');
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const t = translations[language];

  useEffect(() => {
    async function loadCourses() {
      const { data, error } = await supabase
        .from('courses')
        .select('title, course_date, duration_minutes, start_time, description')
        .order('course_date');

      if (error) {
        setError(error.message);
      } else {
        setCourses(data || []);
      }
    }

    loadCourses();
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        fontFamily: 'Arial, sans-serif',
        background: '#f5f5f5'
      }}
    >
      <aside
        style={{
          width: '260px',
          background: '#111',
          color: '#fff',
          padding: '30px 20px'
        }}
      >
        <h2 style={{ marginBottom: '30px', fontSize: '28px' }}>
          MySport
        </h2>

        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}
        >
          <Link
            href="/gptliste"
            style={{
              color: '#fff',
              textDecoration: 'none',
              padding: '14px 18px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.05)'
            }}
          >
            {t.gptList}
          </Link>

          <Link
            href="/sportkurse"
            style={{
              color: '#fff',
              textDecoration: 'none',
              padding: '14px 18px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.12)',
              fontWeight: 'bold'
            }}
          >
            {t.sportCourses}
          </Link>
        </nav>
      </aside>

      <section
        style={{
          flex: 1,
          padding: '40px'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <h1 style={{ fontSize: '42px', marginBottom: '8px' }}>
              {t.sportCourses}
            </h1>
          </div>

          <button
            onClick={toggleLanguage}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              background: '#111',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            {t.switchLanguage}
          </button>
        </div>

        {error && (
          <div
            style={{
              background: '#ffe5e5',
              color: '#b00020',
              padding: '16px',
              borderRadius: '10px',
              marginTop: '20px'
            }}
          >
            {t.error} {error}
          </div>
        )}

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '30px',
            background: '#fff',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
        >
          <thead>
            <tr style={{ background: '#f4f4f4' }}>
              <th style={{ textAlign: 'left', padding: '16px' }}>
                {t.title}
              </th>
              <th style={{ textAlign: 'left', padding: '16px' }}>
                {t.date}
              </th>
              <th style={{ textAlign: 'left', padding: '16px' }}>
                {t.duration}
              </th>
              <th style={{ textAlign: 'left', padding: '16px' }}>
                {t.startTime}
              </th>
              <th style={{ textAlign: 'left', padding: '16px' }}>
                {t.description}
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td style={{ padding: '16px', borderBottom: '1px solid #eee' }}>
                  {course.title}
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid #eee' }}>
                  {course.course_date}
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid #eee' }}>
                  {course.duration_minutes} min
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid #eee' }}>
                  {course.start_time}
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid #eee' }}>
                  {course.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
