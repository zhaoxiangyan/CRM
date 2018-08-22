/**
 * Created by 叶子 on 2017/7/30.
 * 接口地址配置文件
 */

//easy-mock模拟数据接口地址
const EASY_MOCK = 'https://www.easy-mock.com/mock';
const MOCK_TOKEN = EASY_MOCK + '/5b6a978b91ff8e254d62047e/crm';          // 接口地址
export const MOCK_AUTH_ADMIN = MOCK_TOKEN + '/auth/admin';                  // 管理员权限接口
export const MOCK_AUTH_VISITOR = MOCK_TOKEN + '/auth/guest';                // 访问权限接口
export const MOCK_USER_BROKERWORK = MOCK_TOKEN + '/user/brokerwork';        //用户 Borker Work用户列表数据
export const MOCK_USER_TRADERWORK = MOCK_TOKEN + '/user/traderwork';        //用户 Trader Work用户列表数据
export const MOCK_CUSTOM_CUSTOMERS = MOCK_TOKEN + '/custom/customers';      //客户 列表数据
export const MOCK_CUSTOM_SALES = MOCK_TOKEN + '/custom/sales';              //客户 销售机会列表数据

