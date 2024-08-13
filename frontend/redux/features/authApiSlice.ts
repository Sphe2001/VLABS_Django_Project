import { apiSlice } from "../services/apiSlice";

interface User {
    username: string;
    student_no: string;
    surname: string; 
    initials: string;
    email: string;
    qualification: string;
    password: string;
}


const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		retrieveUser: builder.query<User, void>({
			query: () => '/users/me/',
		}),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: '/jwt/create/',
                method: 'POST',
                body: { email, password } 
            }),
        }),
        register: builder.mutation({
            query: ({ username, student_no, email, surname, initials, qualification, password, re_password }) => ({
                url: '/users/',
                method: 'POST',
                body: { username, student_no, email, surname, initials, qualification, password, re_password }
            }),
        }),
        verify: builder.mutation({
			query: () => ({
				url: '/jwt/verify/',
				method: 'POST',
			}),
		}),
        logout: builder.mutation({
            query: () => ({
                url: '/logout/',
                method: 'POST',
                
            }),
        }),
        delete: builder.mutation({
            query: ({ current_password }) => ({
                url: '/users/me/',
                method: 'DELETE',
                body: { current_password }
            }),
        }),
        activation: builder.mutation({
            query: ({uid, token}) => ({
                url: '/users/activation/',
                method: 'POST',
                body: { uid, token },
            }),
        }),
        resetPassword: builder.mutation({
            query: (email) => ({
                url: '/users/reset_password/',
                method: 'POST',
                body: { email },
            }),
        }),
        resetPasswordConfirm: builder.mutation({
            query: ({ uid, token, new_password, re_new_password }) => ({
                url: '/users/reset_password_confirm/',
                method: 'POST',
                body: { uid, token, new_password, re_new_password },
            }),
        }),
        book: builder.mutation({
            query: (id) => ({
                url: `/bookings/create/${id}/`,
                method: 'POST',
                body: {id}
            }),
        }),
        complain: builder.mutation({
            query: (message) => ({
                url: '/complaints/',
                method: 'POST',
                body: {message}
            }),
        }),
        deleteBooking: builder.mutation({
            query: (id) => ({
                url: `/delete/booking/${id}/`,
                method: 'DELETE',
                body: {id}
            }),
        }),
    }),
});

export const {
	useRetrieveUserQuery,
	useLoginMutation,
	useRegisterMutation,
	useVerifyMutation,
	useLogoutMutation,
	useActivationMutation,
	useResetPasswordMutation,
	useResetPasswordConfirmMutation,
    useDeleteMutation,
    useBookMutation,
    useComplainMutation,
    useDeleteBookingMutation,
} = authApiSlice;