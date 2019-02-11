/**
 * 基于async-validator定制的表单验证器
 * https://www.jianshu.com/p/d58fe749b97f
 */

import asyncValidator from 'async-validator'

class validator {
    /**
     * 构造
     * @param rules object async-validator rules
     * @param data  初始对象
     */
    constructor(rules, data) {
        this.setData(data);
        this.setRules(rules);
    }

    /**
     * 重新定义初始对象
     * 也可以直接修改实例的data
     * validator.data = newData
     * @param data
     */
    setData(data) {
        this.data = data;
    }

    /**
     * 设定规则
     * @param rules rules object async-validator rules
     * @param cover 是否替换旧规则
     */
    setRules(rules, {cover} = {}) {
        if (cover === undefined || cover) {
            this.validators = {};
        }
        for (let attr in rules) {
            const rule = {};
            rule[attr] = rules[attr];
            this.validators[attr] = new asyncValidator(rule);
        }
    }

    /**
     * 执行验证
     * @param callback(errors, fields)
     * @param data 可选 传空将验证构造data 传string或数组验证构造data的响应字段
     */
    validate(callback, data) {
        let cb,d;
        if (typeof callback === 'function' ){
            cb = callback;
            d = data;
        }
       
        let _d = d;
        
        if (this.data) {
            if (!d) {
                _d = this.data;
            } else if (typeof d === 'string') {
                _d = {};
                _d[d] = this.data[d]
            } else if (Array.isArray(d)) {
                _d = {};
                d.forEach(attr => {
                    _d[attr] = this.data[attr]
                })
            }
        }

        const err = [];

        if (_d) {
            for (let attr in _d) {
                if (this.validators[attr]) {
                    const o = {};
                    o[attr] = _d[attr];
                    this.validators[attr].validate(o, (error) => {
                        if (error) {
                            err.push(error[0])
                        }
                    })
                }
                if (err.length)
                {
                    break
                }
            }
        }

        cb && cb(err)
    }
}

export default function (rules, data) {
    return new validator(rules, data)
}