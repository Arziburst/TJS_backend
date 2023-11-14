// ! https://github.com/liqpay/sdk-nodejs/blob/master/lib/liqpay.js

/**
 * Liqpay Payment Module
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 *
 * @module          liqpay
 * @category        LiqPay
 * @package         liqpay/liqpay
 * @version         3.1
 * @author          Liqpay
 * @copyright       Copyright (c) 2014 Liqpay
 * @license         http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 *
 * EXTENSION INFORMATION
 *
 * LIQPAY API       https://www.liqpay.ua/documentation/uk
 *
 */

import axios from 'axios';
import crypto from 'crypto';

/**
 * Creates object with helpers for accessing to Liqpay API
 *
 * @param {string} public_key
 * @param {string} private_key
 *
 * @throws {Error}
 */

export class LiqPay {
    /**
     * @member {string} API host
    */

    // Types
    host: string;
    availableLanguages: string[];
    buttonTranslations: { ru: string; uk: string; en: string; };
    public_key: string;
    private_key: string;

    constructor(parameters: { public_key: string, private_key: string}) {
        this.public_key = parameters.public_key;
        this.private_key = parameters.private_key;
        this.host = 'https://www.liqpay.ua/api/';
        this.availableLanguages = [ 'ru', 'uk', 'en' ];
        this.buttonTranslations = { ru: 'Оплатить', uk: 'Сплатити', en: 'Pay' };
    }

    /**
     * Call API
     *
     * @param {string} path
     * @param {object} params
     * @return {object}
     * @throws {Error}
    */

    async api(path: string, params: any) {
        if (!params.version) {
            throw new Error('version is null');
        }

        params.public_key = this.public_key;
        const data = Buffer.from(JSON.stringify(params)).toString('base64');
        const signature = this.str_to_sign(this.private_key + data + this.private_key);

        const dataToSend = new URLSearchParams();
        dataToSend.append('data', data);
        dataToSend.append('signature', signature);

        try {
            const response = await axios.post(this.host + path, dataToSend, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (response.status === 200) {
                return response.data;
            }
            throw new Error(`Request failed with status code: ${response.status}`);
        } catch (error) {
            throw error;
        }
    }

    /**
     * cnb_form
     *
     * @param {object} params
     *
     * @return {string}
     *
     * @throws {Error}
    */

    cnb_form(params: {
        language?: 'ru' | 'uk' | 'en';
        action: string;
        amount: string;
        currency: string;
        description: string;
        order_id: string;
        version: string;
    }) {
        let buttonText = this.buttonTranslations.uk;
        if (params.language) {
            buttonText = this.buttonTranslations[ params.language ] || this.buttonTranslations.uk;
        }

        const newParams = this.cnb_params(params);
        const data = Buffer.from(JSON.stringify(newParams)).toString('base64');
        const signature = this.str_to_sign(this.private_key + data + this.private_key);

        // return '<form method="POST" action="https://www.liqpay.ua/api/3/checkout" accept-charset="utf-8">'
        // + '<input type="hidden" name="data" value="' + data + '" />'
        // + '<input type="hidden" name="signature" value="' + signature + '" />'
        // + '<script type="text/javascript" src="https://static.liqpay.ua/libjs/sdk_button.js"></script>'
        // + '<sdk-button label="' + buttonText + '" background="#77CC5D" onClick="submit()"></sdk-button>'
        // + '</form>';

        return {
            data,
            signature,
        };
    }

    /**
    * cnb_signature
    *
    * @param {object} params
    *
    * @return {string}
    *
    * @throws {InvalidArgumentException}
    */

    cnb_signature(params: unknown) {
        const newParams = this.cnb_params(params);
        const data = Buffer.from(JSON.stringify(newParams)).toString('base64');

        return this.str_to_sign(this.private_key + data + this.private_key);
    }

    /**
    * cnb_params
    *
    * @param {object} params
    *
    * @return {object} params
    *
    * @throws {Error}
    */

    cnb_params(params: any) {
        params.public_key = this.public_key;

        // Validate and convert version to number
        if (params.version) {
            if (typeof params.version === 'string' && !isNaN(Number(params.version))) {
                params.version = Number(params.version);
            } else if (typeof params.version !== 'number') {
                throw new Error('version must be a number or a string that can be converted to a number');
            }
        } else {
            throw new Error('version is null');
        }

        // Validate and convert amount to number
        if (params.amount) {
            if (typeof params.amount === 'string' && !isNaN(Number(params.amount))) {
                params.amount = Number(params.amount);
            } else if (typeof params.amount !== 'number') {
                throw new Error('amount must be a number or a string that can be converted to a number');
            }
        } else {
            throw new Error('amount is null');
        }

        // Ensure other parameters are strings
        const stringParams = [ 'action', 'currency', 'description', 'order_id', 'language' ];
        for (const param of stringParams) {
            if (params[ param ] && typeof params[ param ] !== 'string') {
                params[ param ] = String(params[ param ]);
            } else if (!params[ param ] && param !== 'language') { // language is optional
                throw new Error(`${param} is null or not provided`);
            }
        }

        // Check if language is set and is valid
        if (params.language && !this.availableLanguages.includes(params.language)) {
            throw new Error(`Invalid language: ${params.language}. Supported languages are: ${this.availableLanguages.join(', ')}`);
        }

        return params;
    }

    /**
     * str_to_sign
     *
     * @param {string} str
     *
     * @return {string}
     *
     * @throws {Error}
     */

    str_to_sign(str: string) {
        if (typeof str !== 'string') {
            throw new Error('Input must be a string');
        }

        const sha1 = crypto.createHash('sha1');
        sha1.update(str);

        return sha1.digest('base64');
    }

    /**
     * Return Form Object
     *
     * @param {object} params
     *
     * @returns {{ data: string, signature: string }} Form Object
     */

    cnb_object(params: any) {
        params.language = params.language || 'uk';
        const newParams = this.cnb_params(params);
        const data = Buffer.from(JSON.stringify(newParams)).toString('base64');
        const signature = this.str_to_sign(this.private_key + data + this.private_key);

        return { data: data, signature: signature };
    }
}
