import React from "react";
import styles from "../../app.css"
function footer() {

    return(
        <div className={styles.footer}>

        <div className="col-md-12">
          <div className="footer p-3 mt-4 text-center bg-dark text-light">
            Developed By:
            <span className="text-warning font-weight-normal">
              Manoj Reddy
            </span>
            , Using <i className="fab fa-react" /> React JS &amp; Redux JS

          </div>
        </div>

    </div>

    )
}


export default footer
