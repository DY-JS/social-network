import React from "react";
import styles from './ProfileInfo.module.css'

function ProfileInfo() {
    return (
                <div className={styles.info}>
                    <img className={styles.info__img}
                         src="https://m.gordonua.com/img/article/15924/50_tn.jpg?v1643214151" />
                    <div className={styles.info__person}>
                        <p className={styles.info__name}>Dmytro Y.</p>
                        <p className={styles.info__text}>
                            <span className={styles.info__item}>Date of Birth: </span>
                            16 April
                        </p>
                        <p className={styles.info__text}>
                            <span className={styles.info__item}>City: </span>
                            Sopot
                        </p>
                        <p className={styles.info__text}>
                            <span className={styles.info__item}>Education: </span>
                            ZNTU
                        </p>
                        <p className={styles.info__text}>
                            <span className={styles.info__item}>Site: </span>
                            https://dy-js.com</p>
                    </div>
                </div>
    );
}

export default ProfileInfo;
