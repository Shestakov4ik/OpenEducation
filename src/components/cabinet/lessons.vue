<script>
import { createClient } from '@supabase/supabase-js';
import supabase from "@/supabase.js";

export default {
  name:"less",
  props: {
    course: Number,
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const {data: lessons, error: error} = await supabase.from('lessons').select('*').eq('id_course', this.course)
      if (lessons) throw lessons;
    }
  },

}
</script>

<template>

lessonsgfsags

</template>

<style scoped>

</style>