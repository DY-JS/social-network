import React, {InputHTMLAttributes} from 'react';
import s from './FormControls.module.css'

// const FormControls: React.FC<PropsType> = ({ input, meta, ...props }) => {
//     const hasError = meta.touched && meta.error;
//
//     return (
//         <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
//             <textarea {...input} {...props} />
//             {hasError && <span className={s.errorText}>{meta.error}</span>}
//         </div>
//     );
// };


type PropsType = {
    input: InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
    meta: {
        touched: boolean;
        error: string;
    };
};

export const TextArea: React.FC<PropsType> = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;

    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <textarea {...input} {...props} />
            {hasError && <span className={s.errorText}>{meta.error}</span>}
        </div>
    );
};

export const Input: React.FC<PropsType> = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;

    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <input {...input} {...props} />
            {hasError && <span className={s.errorText}>{meta.error}</span>}
        </div>
    );
};
