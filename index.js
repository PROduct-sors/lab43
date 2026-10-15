// ==========================================
// ЗАВДАННЯ 7. Знайти помилки та виправити код
// ==========================================
/*
ПОМИЛКИ В ОРИГІНАЛІ:
1. Не задано значення state за замовчуванням (state = initialState).
2. Пряма мутація стану (state.count++), що порушує принцип immutability.
3. Відсутній блок `default: return state;`, через що при невідомій дії reducer поверне undefined і зламає додаток.
4. У case 'RESET' не використовується `...state`, що може призвести до втрати інших властивостей стану.
*/

const initialCounterState = { count: 0 };

const fixedCounterReducer = (state = initialCounterState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1
            };
        case 'RESET':
            return {
                ...state,
                count: 0
            };
        default:
            return state;
    }
};

// ==========================================
// ІНДИВІДУАЛЬНЕ ЗАВДАННЯ. Варіант 8: Замовлення
// ==========================================

// 1. Створити initialState
const initialOrderState = {
    orders: []
};

// 2. Створити reducer (мінімум 3 дії, payload, spread, map/filter, default)
const orderReducer = (state = initialOrderState, action) => {
    switch (action.type) {
        case 'ADD_ORDER':
            return {
                ...state,
                orders: [...state.orders, action.payload]
            };
            
        case 'REMOVE_ORDER':
            return {
                ...state,
                orders: state.orders.filter(order => order.id !== action.payload)
            };
            
        case 'CHANGE_STATUS':
            return {
                ...state,
                orders: state.orders.map(order => 
                    order.id === action.payload.id 
                        ? { ...order, status: action.payload.status } 
                        : order
                )
            };

        default:
            return state;
    }
};

// 3. Продемонструвати роботу reducer (5 dispatch/action)
console.log('--- СТАРТ: Немає замовлень ---');
let currentOrderState = orderReducer(undefined, {});
console.log(currentOrderState);

console.log('\n--- ДІЯ 1: Додаємо перше замовлення ---');
currentOrderState = orderReducer(currentOrderState, {
    type: 'ADD_ORDER',
    payload: { id: 101, item: 'Ноутбук ASUS TUF F15', status: 'В обробці', total: 35000 }
});
console.log(currentOrderState);

console.log('\n--- ДІЯ 2: Додаємо друге замовлення ---');
currentOrderState = orderReducer(currentOrderState, {
    type: 'ADD_ORDER',
    payload: { id: 102, item: 'Мишка REAL-EL', status: 'Очікує оплати', total: 500 }
});
console.log(currentOrderState);

console.log('\n--- ДІЯ 3: Змінюємо статус першого замовлення ---');
currentOrderState = orderReducer(currentOrderState, {
    type: 'CHANGE_STATUS',
    payload: { id: 101, status: 'Відправлено (Meest)' }
});
console.log(currentOrderState);

console.log('\n--- ДІЯ 4: Змінюємо статус другого замовлення ---');
currentOrderState = orderReducer(currentOrderState, {
    type: 'CHANGE_STATUS',
    payload: { id: 102, status: 'Оплачено (Portmone)' }
});
console.log(currentOrderState);

console.log('\n--- ДІЯ 5: Видаляємо (скасовуємо) друге замовлення ---');
currentOrderState = orderReducer(currentOrderState, {
    type: 'REMOVE_ORDER',
    payload: 102 // id другого замовлення
});
console.log(currentOrderState);