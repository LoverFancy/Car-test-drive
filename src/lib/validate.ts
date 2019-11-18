/**
 * @description 验证规则
 */
const formValidate = {
    // 身份证号验证
    ID: (value: string, callback: any) => {
        // tslint:disable-next-line: no-shadowed-variable
        const checkCode = (value: string) => {
            const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            const code = value.substring(17);
            let sum: number = 0;
            for (let i = 0; i < 17; i++) {
                sum += value[i] * factor[i];
            }
            if (parity[sum % 11] === code.toUpperCase()) {
                return true;
            }
            return false;
        };

        const regId15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/; // 十五位正则
        // 十八位正则
        const regId = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (!value) {
            callback('证件号码不能为空');
        } else if (regId15.test(value)) {
            callback('');
        } else if (checkCode(value) && regId.test(value)) {
            callback('');
        } else {
            callback('证件号码验证未通过');
        }
    },
    // 手机号验证
    Tel: (value: string, callback: any) => {
        const tel = /^1[345789]\d{9}$/;
        if (!value) {
            callback('手机号不能为空');
        } else {
            callback('');
        }
    },
    // 手机号或座机号验证
    Landline: (value: string, callback: any) => {
        const landline = /^((0\d{2,3}[-]\d{7,8})|(1[345789]\d{9}))$/;
        if (!value) {
            callback('手机/座机号不能为空');
        } else {
            callback('');
        }
    },
    // 真实姓名验证
    RealName: (value: string, callback: any) => {
        if (!value) {
            callback('姓名不能为空');
        } else {
            callback('');
        }
    },
    // 性别验证
    Sex: (value: string, callback: any) => {
        if (!value) {
            callback('性别不能为空');
        } else {
            callback('');
        }
    },
    // 民族验证
    Nationality: (value: string, callback: any) => {
        if (!value) {
            callback('民族不能为空');
        } else if (value.length >= 20) {
            callback('民族不超过20个字');
        } else {
            callback('');
        }
    },
    // 生日验证
    Birth: (value: string, callback: any) => {
        if (!value) {
            callback('生日不能为空');
        } else {
            callback('');
        }
    },
    // 地址验证
    Address: (value: string, callback: any) => {
        if (!value) {
            callback('地址不能为空');
        } else if (value.length >= 100) {
            callback('地址不超过100个字');
        } else {
            callback('');
        }
    },
    // 密码
    Pass: (value: string, callback: any) => {
        const patrn = /([a-zA-Z0-9]|[._]){5,19}$/;
        if (!value) {
            callback('密码不能为空');
        } else if (!patrn.test(value)) {
            callback('密码6~20位数');
        } else {
            callback('');
        }
    },
    // 验证码
    Verification: (value: string, callback: any) => {
        const patrn = /^\d{4}$/;
        if (!patrn.test(value)) {
            callback('请输入4位数验证码');
        } else {
            callback('');
        }
    },
    // 工作单位
    Work: (value: string, callback: any) => {
        if (!value) {
            callback('工作单位不能为空');
        } else if (value.length >= 100) {
            callback('工作单位不超过100个字');
        } else {
            callback('');
        }
    },
    // 是否为空
    IsNull: (value: string, callback: any) => {
        if (!value) {
            callback('此项不能为空');
        } else if (value.length >= 50) {
            callback('不得超过50个字符');
        } else {
            callback('');
        }
    },
    // 营业执照
    BusinessLicense: (value: string, callback: any) => {
        const reg = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/;
        if (!value) {
            callback('营业执照不能为空');
        } else if (!reg.test(value)) {
            callback('请输入正确的营业执照号码');
        } else {
            callback('');
        }
    },
};
export default formValidate;
