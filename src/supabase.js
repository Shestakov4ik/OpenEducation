//Импортируем библиотеку Supabase
import { createClient } from '@supabase/supabase-js';

//Указываем ссылку на БД и ключ доступа
const URL = 'https://wzvqbcjcdaedzujweqnq.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6dnFiY2pjZGFlZHp1andlcW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0Mjg3ODcsImV4cCI6MjAzMzAwNDc4N30.0R1wP6aMQS4fyJtiNBca5MLicCUmScbYKiJPkmjIQOM';

//Прописываем подкючение
const supabase = createClient(URL, KEY);

export default supabase;
