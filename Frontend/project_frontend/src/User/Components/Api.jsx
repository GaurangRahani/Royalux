// export const baseUrl = "https://localhost:8000/api/v1";
export const baseUrl = "http://localhost:8000/api/v1";
export const verifyEmailUrl = `${baseUrl}/auth/verify-email`; //user ///done
export const verifyOtpUrl = `${baseUrl}/auth/verify-otp`; //user //done
export const signUpUrl = `${baseUrl}/auth/sign-up`; //user //done
export const signInUrl = `${baseUrl}/auth/sign-in`; //user //done
export const forgetPasswordUrl = `${baseUrl}/auth/forgot-password`; //user //done
export const resetPasswordUrl = `${baseUrl}/auth/reset-password`; //user //done
export const googleLoginUrl = `${baseUrl}/auth/google-login`; //user //done
export const addPropertyUrl = `${baseUrl}/property/add-property`; //user //done
export const userProfileUrl = `${baseUrl}/auth/get-user`; //user //pending
export const changeProfileUrl = `${baseUrl}/auth/change-profilePic`; //user //done
export const deleteProfileUrl = `${baseUrl}/auth/delete-profilePic`; //user
export const getPropertyUrl = `${baseUrl}/property/getall-property`; //user

export const getAdminAllPropertyUrl = `${baseUrl}/admin/getall-property-admin`; //admin //done
export const getAdminAllRentPropertyUrl = `${baseUrl}/admin/getall-rentproperty-admin`; //admin //done
export const getAdminAllSellPropertyUrl = `${baseUrl}/admin/getall-sellproperty-admin`; //admin //done

export const setApproveUrl = `${baseUrl}/property/set-approveproperty`; //user //done
export const setRejectUrl = `${baseUrl}/property/set-cancelproperty`; //user //done
export const getRentPropertyUrl = `${baseUrl}/property/getall-rentproperty`; //user
export const getSellPropertyUrl = `${baseUrl}/property/getall-sellproperty`; //user
export const getAdminSelectedPropertyUrl = `${baseUrl}/property/get-selected-property`; //user

export const totalPropertyCountUrl = `${baseUrl}/admin/total-property-count`; //admin
export const totalRentCountUrl = `${baseUrl}/admin/total-rentproperty-count`; //admin
export const totalSellCountUrl = `${baseUrl}/admin/total-sellproperty-count`; //admin
export const totalUserCountUrl = `${baseUrl}/admin/total-user-count`; //admin
export const totalAgentCountUrl = `${baseUrl}/admin/total-agent-count`; //addmin

export const agentVerifyUrl = `${baseUrl}/agent/verify-agent`;
export const agentAddUrl = `${baseUrl}/agent/add-agent`;
// export const pendingStatusUrl = `${baseUrl}/property/getuserpending-property`;
export const addFeedbackUrl = `${baseUrl}/feedback/add-feedback`; //user
export const getFeedbackUrl = `${baseUrl}/feedback/get-feedbacks`; //user
export const getUserAllPropertyUrl = `${baseUrl}/property/getuserall-property`; //admin
export const getUserSelectedPropertyUrl = `${baseUrl}/property/get-selected-property-user`; //admin
export const setPropertyPaymentFullfield = `${baseUrl}/property/set-isproperty`; //user
export const getUserUrl = `${baseUrl}/admin/getall-user`; // admin
export const getAgentUrl = `${baseUrl}/admin/getall-agent`; //admin
export const getRecentPropertyUrl = `${baseUrl}/admin/get-all-analytics-count`;

export const setMeetingUrl = `${baseUrl}/agent/set-meeting`;
export const approveAgentUrl = `${baseUrl}/admin/set-approveagent`;
export const cancleAgentUrl = `${baseUrl}/admin/set-cancelagent`;
export const addUserQueryUrl = `${baseUrl}/contact/add-userquery`;
export const getUserQueryUrl = `${baseUrl}/contact/get-userqueries`;

export const deleteAccountUrl = `${baseUrl}/auth/delete-user`;
export const agentPropertyUrl = `${baseUrl}/agent/getall-agentproperty`;

export const agentProfileUrl = `${baseUrl}/agent/agent-profile`;
export const agentEditProfileUrl = `${baseUrl}/agent/change-profilePic`;
export const agentDeleteProfileUrl = `${baseUrl}/agent/delete-profilePic`;


export const setLikePropertyUrl = `${baseUrl}/property/set-likeproperty`;
export const getLikePropertyUrl = `${baseUrl}/property/get-likeproperty`;

export const getAllPaymentPropertyUrl = `${baseUrl}/property/get-allpayment-property`;