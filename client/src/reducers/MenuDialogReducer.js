export const initialMenuDialogOpen = [
    {
        id: 'allergies',
        open: false
    },
    {
        id: 'religious',
        open: false
    },
    {
        id: 'intolerances',
        open: false
    }
];

export const menuDialogReducer = (state, action) => {
    switch (action.type) {
        case 'OPEN':
            return state.map(item => {
                if (item.id === action.id)
                    return { ...item, open: true };
                return item;
            })
        case 'CLOSE':
            return state.map(item => {
                if (item.id === action.id)
                    return { ...item, open: false };
                return item;
            });
        default:
            return state;
    }
};