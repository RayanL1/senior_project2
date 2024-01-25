import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js';
import { getStorage, ref ,uploadBytes,getDownloadURL} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js';
const firebaseConfig = {
    apiKey: "AIzaSyCHnGmy3_7JR72ODC6I7JiSPEMv1FbueYs",
    authDomain: "senior-project-624e4.firebaseapp.com",
    projectId: "senior-project-624e4",
    storageBucket: "senior-project-624e4.appspot.com",
    messagingSenderId: "457838535155",
    appId: "1:457838535155:web:363e5eb2fd53a9bbccf286",
    measurementId: "G-LM88B3NW2W"
  };
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const SubmitcertificatesInfoModal = document.getElementById("SubmitcertificatesInfoModal")
SubmitcertificatesInfoModal.onclick = ()=>{
    const fileInput = document.getElementById('certificates-file');
    const file = fileInput.files[0];
    
    // إنشاء مسار تخزين للملف داخل مخزن Firebase
    const filePath = 'uploads/' + file.name;
    const fileRef = ref(storage, filePath);
    
    // قم بتحميل الملف
    const uploadTask = uploadBytes(fileRef, file);
    uploadTask.then(snapshot => {
      console.log('تم التحميل بنجاح.');
    
      // احصل على رابط التنزيل بعد التحميل
      getDownloadURL(fileRef).then(downloadURL => {
        console.log('رابط التنزيل:', downloadURL);
        fetch("/certificates",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        name:document.getElementById("certificates-name").value,
        name:document.getElementById("certificates-desc").value,
        ImageUrl:downloadURL,
        token:localStorage.getItem("token")
    })})
        // يمكنك القيام بإجراءات إضافية بعد التحميل هنا
      }).catch(error => {
        console.error('حدث خطأ في الحصول على رابط التنزيل:', error);
      });
    }).catch(error => {
      // حدث خطأ أثناء التحميل
      console.error('خطأ في التحميل:', error);
    });
    
}
const SubmitProject = document.getElementById("SubmitProject")
SubmitProject.onclick = ()=>{
    const fileInput = document.getElementById('project-file');
    const file = fileInput.files[0];
    
    // إنشاء مسار تخزين للملف داخل مخزن Firebase
    const filePath = 'uploads/' + file.name;
    const fileRef = ref(storage, filePath);
    
    // قم بتحميل الملف
    const uploadTask = uploadBytes(fileRef, file);
    uploadTask.then(snapshot => {
      console.log('تم التحميل بنجاح.');
    
      // احصل على رابط التنزيل بعد التحميل
      getDownloadURL(fileRef).then(downloadURL => {
        console.log('رابط التنزيل:', downloadURL);
        fetch("/project",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        name:document.getElementById("project-name").value,
        name:document.getElementById("project-desc").value,
        ImageUrl:downloadURL,
        token:localStorage.getItem("token")
    })})
        // يمكنك القيام بإجراءات إضافية بعد التحميل هنا
      }).catch(error => {
        console.error('حدث خطأ في الحصول على رابط التنزيل:', error);
      });
    }).catch(error => {
      // حدث خطأ أثناء التحميل
      console.error('خطأ في التحميل:', error);
    });
    
}
const SubmitPersonal = document.getElementById("SubmitPersonal")
SubmitPersonal.onclick = ()=>{
    fetch("/personal",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        name:document.getElementById("personal-name").value,
        major:document.getElementById("personal-major").value,
        about:document.getElementById("personal-about").value,
        email:document.getElementById("personal-email").value,
        token:localStorage.getItem("token")
    })})
}