<<<<<<< HEAD
const createEmailTemplate = (contentVerify, linkVerify) => {
=======
const createEmailTemplate = (contentReset, linkReset) => {
>>>>>>> 92d6003bc62251c09180c3ea5a5b6287ad589ed2
  const message = `<div style="background:#ECF0F1;width:100%;padding:20px 0;">
               <div style="max-width:760px;margin:0 auto;background:#ffffff" font-size:1.2em>
               <div style="background:#266cef;padding:10px;color:#ffffff;text-align:center;font-size:34px">
               Authors Haven
               </div>
               <div style="padding:20px;text-align:left;color:black" font-family: verdana>
<<<<<<< HEAD
               ${contentVerify}
               <br>
               <p style="font-size: 1rem; color:#266cef"><strong> ${linkVerify} </strong></p>
=======
               ${contentReset}
               <br>
               <p style="font-size: 1rem; color:#266cef"><strong> ${linkReset} </strong></p>
>>>>>>> 92d6003bc62251c09180c3ea5a5b6287ad589ed2
               <br>
               <p style="font-size: 1rem;">All the best,</p>
               <p style="font-size: 1rem;">Your friends at <strong>Authors Haven</strong></p>
               </div>
               </div>
               <div style="padding:30px 10px;text-align:center;">
               Copyright &copy; 2019
               </div>
               </div>`;
  return message;
};
<<<<<<< HEAD

=======
>>>>>>> 92d6003bc62251c09180c3ea5a5b6287ad589ed2
export default createEmailTemplate;
