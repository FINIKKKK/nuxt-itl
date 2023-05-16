export const items = [
    [
        {id: 1, name: "home"},
        {id: 2, name: "add"},
        {id: 3, name: "search"},
    ],
    [
        {id: 4, name: "tooltip"},
        {id: 5, name: "settings"},
        {id: 6, name: "user"},
    ],
];

export const innerItems = [
    {
        id: 1,
        title: "Ваша компания",
        items: [
            {id: 1, icon: "activation", label: "Активность", link: "/"},
            {id: 2, icon: "document", label: "Ваши работы", link: "/my_works"},
            {id: 3, icon: "favorite", label: "Закладки", link: "/favorites"},
        ],
    },
    {
        id: 2,
        title: "Посты",
        items: [
            {id: 1, icon: "document", label: "Статью", link: "/posts/create"},
            {id: 2, icon: "folder", label: "Раздел", link: "/sections/create"},
        ],
    },
    {
        id: 3,
        title: "Поиск",
        items: [{id: 1, icon: "search", label: "Поиск", link: "/"}],
    },
    {
        id: 5,
        title: "Настройки",
        items: [
            {id: 1, icon: "settings", label: "Общие", link: "settings/general"},
            {id: 2, icon: "user", label: "Соотрудники", link: "settings/employees"},
            {id: 3, icon: "tag", label: "Внешние интеграции", link: "settings/integrations"},
        ],
    },
    {
        id: 6,
        title: "Профиль",
        items: [
            {id: 1, icon: "favorite", label: "Закладки", link: "account/favorites"},
            {id: 2, icon: "edit", label: "Редактировать", link: "account/profile"},
            {id: 3, icon: "change", label: "Сменить компанию", link: "/"},
            {id: 4, icon: "logout", label: "Выйти", link: "/"},
        ],
    },
];