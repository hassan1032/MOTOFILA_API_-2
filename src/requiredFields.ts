export const userAuthFields = {
   register: ['name', 'mobile', 'email', 'password'],
   login: ['mobile', 'password'],
};

export const workerFields = {
   create: ['parkingId', 'name', 'mobile', 'salary', 'dateOfJoining', 'aadharNo', 'documentId', 'profileImg'],
   update: ['parkingId', 'name', 'mobile', 'salary', 'dateOfJoining', 'aadharNo', 'documentId', 'profileImg'],
};

export const parkingFields = {
   create: ['name', 'vendorId', 'vendorName', 'location', 'parkingImage'],
   update: ['name', 'vendorId', 'vendorName', 'location', 'parkingImage'],
};