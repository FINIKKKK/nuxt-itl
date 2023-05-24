import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import { TCompany } from '~/api/models/company/types';

/**
 * --------------------------------
 * Хранилище автивной компании
 * --------------------------------
 */
export const useActiveCompanyStore = defineStore('activeCompanyStore', () => {
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

  return {
    activeCompany,
    setActiveCompany,
  };
});
