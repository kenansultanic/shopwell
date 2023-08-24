
export const initialSidebarListValues = [0, 1, 2, 3, 4, 5, 6].map(n => ({ id: n, selected: n === 0 }));

export const sidebarReducer = (state, action) => {
    switch (action.type) {
        case 'SELECT':
            return state.map(item => {
                if (item.id === action.id)
                    return { ...item, selected: true };
                return { ...item, selected: false };
            });
        default:
            return state;
    }
};