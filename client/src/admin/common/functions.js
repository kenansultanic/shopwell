import {getUser, getUsers} from "../actions/users";
import {deleteRestrictions, getRestriction, getRestrictions} from "../actions/restrictions";

export const getRequiredResourceByID = resource => {

    switch (resource) {
        case 'users':
            return getUser;
        case 'restrictions':
            return getRestriction
        default:
            return null;
    }
};

export const getRequiredResources = resource => {
    switch (resource) {
        case 'users':
            return getUsers;
        case 'restrictions':
            return getRestrictions;
        default:
            return null;
    }
};

export const deleteRequiredResources = resource => {
    switch (resource) {
        case 'users':
            return getUsers;
        case 'restrictions':
            return deleteRestrictions;
        default:
            return null;
    }
};