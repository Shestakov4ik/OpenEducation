//Импортируем библиотеку Supabase
import { createClient } from '@supabase/supabase-js';

//Указываем ссылку на БД и ключ доступа
const URL = 'https://bvyrptbwohqfvfnsnduz.supabase.co/';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2eXJwdGJ3b2hxZnZmbnNuZHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1ODcyNTEsImV4cCI6MjAzMDE2MzI1MX0.QlGpDnDw8JRkqhgVP-TsE0QhmMejPaDHbIEsllicuK0';

//Прописываем подкючение
const supabase = createClient(URL, KEY);

export default supabase;
