import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import { TCompany } from '~/api/models/company/types';
import { TSection } from '~/api/models/section/types';
import { TPost } from '~/api/models/post/types';

/**
 * --------------------------------
 * Хранилище активной компании
 * --------------------------------
 */
export const useCompanyStore = defineStore('companyStore', () => {
  /**
   * Свойства ----------------
   */
  const activeCompany: Ref<TCompany | null> = ref(null); // Активная компания

  /**
   * Методы ----------------
   */
  // Ставим автивную компанию
  const setActiveCompany = (obj: TCompany | null) => {
    activeCompany.value = obj;
  };

  /**
   * Вычисляемые значения ----------------
   */
  // Slug активной компании
  const activeCompanySlug = computed(() => {
    return `/companies/${activeCompany.value?.slug}`;
  });

  return {
    activeCompany,
    setActiveCompany,
    activeCompanySlug,
  };
});
