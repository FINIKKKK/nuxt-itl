import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import { TSection } from '~/api/models/section/types';
import { TPost } from '~/api/models/post/types';

/**
 * ----------------------------------------------------------------
 * Хранилище элементов раздела (для сайдбара)
 * ----------------------------------------------------------------
 */
export const useSectionItemsStore = defineStore('sectionItemsStore', () => {
  /**
   * Свойства ----------------
   */
  const sectionName: Ref<string> = ref(''); // Название активного раздела
  const sections: Ref<TSection[]> = ref([]); // Подразделы
  const posts: Ref<TPost[]> = ref([]); // Посты

  /**
   * Методы ----------------
   */
  // Устанавиливаем элементы в разделе
  const setSectionItems = (name: string, arr1: TSection[], arr2: TPost[]) => {
    sectionName.value = name;
    sections.value = arr1;
    posts.value = arr2;
  };

  return {
    sectionName,
    sections,
    posts,
    setSectionItems,
  };
});
