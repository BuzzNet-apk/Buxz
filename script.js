/* =========================
   BUZZCHAT SCRIPT
========================= */

/* NAVIGATION */

const navItems = document.querySelectorAll(".nav-link");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((nav) => {
      nav.classList.remove("active");
    });

    item.classList.add("active");
  });
});


/* SEND MESSAGE */

const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

function getChatKey() {
  const activeGroup = localStorage.getItem("buzzchatActiveGroup");

  if (activeGroup) {
    return "buzzchatMessages_group_" + activeGroup;
  }

  return "buzzchatMessages_Daniel";
}

function loadSavedMessages() {
  const messages = document.querySelector(".messages");

  if (!messages) return;

  const savedMessages = JSON.parse(
    localStorage.getItem(getChatKey()) || "[]"
  );

  savedMessages.forEach(function(messageData) {

    const message = document.createElement("div");

    message.className = "message sent";

    message.innerHTML = `
      <p>${messageData.text}</p>
      <span>
        ${messageData.time}
        <i class="fa-solid fa-check-double"></i>
      </span>
    `;

    messages.appendChild(message);
  });

  messages.scrollTop = messages.scrollHeight;
}

function sendMessage() {

  if (!messageInput) return;

  const messageText = messageInput.value.trim();

  if (messageText === "") return;

  const messages = document.querySelector(".messages");

  if (!messages) return;

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  const message = document.createElement("div");

  message.className = "message sent";

  message.innerHTML = `
    <p>${messageText}</p>
    <span>
      ${time}
      <i class="fa-solid fa-check-double"></i>
    </span>
  `;

  messages.appendChild(message);

  const savedMessages = JSON.parse(
    localStorage.getItem(getChatKey()) || "[]"
  );

  savedMessages.push({
    text: messageText,
    time: time
  });

  localStorage.setItem(
    getChatKey(),
    JSON.stringify(savedMessages)
  );

  messageInput.value = "";

  messages.scrollTop = messages.scrollHeight;
}

if (messageInput && sendBtn) {

  sendBtn.addEventListener("click", sendMessage);

  messageInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
      sendMessage();
    }

  });

}

loadSavedMessages();

/* EMOJI */

const emojiBtn = document.getElementById("emojiBtn");

if (emojiBtn && messageInput) {
  emojiBtn.addEventListener("click", function () {
    messageInput.value += " 😊";
    messageInput.focus();
  });
}


/* ATTACHMENT */

const attachBtn = document.getElementById("attachBtn");

if (attachBtn) {
  attachBtn.addEventListener("click", function () {
    const fileInput = document.createElement("input");

    fileInput.type = "file";
    fileInput.accept = "image/*,video/*,.pdf";

    fileInput.click();
  });
}


/* VOICE CALL */

const voiceCallBtn = document.getElementById("voiceCallBtn");

if (voiceCallBtn) {
  voiceCallBtn.addEventListener("click", function () {
    window.location.href = "call.html";
  });
}


/* VIDEO CALL */

const videoCallBtn = document.getElementById("videoCallBtn");

if (videoCallBtn) {
  videoCallBtn.addEventListener("click", function () {
    window.location.href = "video-call.html";
  });
}


/* END VOICE CALL */

const endCallBtn = document.getElementById("endCallBtn");

if (endCallBtn) {
  endCallBtn.addEventListener("click", function () {
    window.location.href = "chat.html";
  });
}


/* VOICE CALL MUTE */

const muteBtn = document.getElementById("muteBtn");

if (muteBtn) {
  muteBtn.addEventListener("click", function () {
    muteBtn.classList.toggle("active");

    const icon = muteBtn.querySelector("i");
    const text = muteBtn.querySelector("span");

    if (muteBtn.classList.contains("active")) {
      icon.className = "fa-solid fa-microphone-slash";
      text.textContent = "Muted";
    } else {
      icon.className = "fa-solid fa-microphone";
      text.textContent = "Mute";
    }
  });
}


/* VOICE CALL SPEAKER */

const speakerBtn = document.getElementById("speakerBtn");

if (speakerBtn) {
  speakerBtn.addEventListener("click", function () {
    speakerBtn.classList.toggle("active");

    const icon = speakerBtn.querySelector("i");
    const text = speakerBtn.querySelector("span");

    if (speakerBtn.classList.contains("active")) {
      icon.className = "fa-solid fa-volume-high";
      text.textContent = "Speaker On";
    } else {
      icon.className = "fa-solid fa-volume-xmark";
      text.textContent = "Speaker Off";
    }
  });
}


/* VOICE CALL TIMER */

const callStatus = document.getElementById("callStatus");

if (callStatus) {
  let seconds = 0;

  setTimeout(function () {
    callStatus.textContent = "Connected";
  }, 1500);

  setTimeout(function () {
    setInterval(function () {
      seconds++;

      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(remainingSeconds).padStart(2, "0");

      callStatus.textContent =
        formattedMinutes + ":" + formattedSeconds;
    }, 1000);
  }, 2500);
}


/* VIDEO CALL MUTE */

const videoMuteBtn = document.getElementById("videoMuteBtn");

if (videoMuteBtn) {
  videoMuteBtn.addEventListener("click", function () {
    videoMuteBtn.classList.toggle("active");

    const icon = videoMuteBtn.querySelector("i");

    if (videoMuteBtn.classList.contains("active")) {
      icon.className = "fa-solid fa-microphone-slash";
    } else {
      icon.className = "fa-solid fa-microphone";
    }
  });
}


/* VIDEO CAMERA */

const cameraBtn = document.getElementById("cameraBtn");
const selfVideo = document.querySelector(".self-video");

if (cameraBtn && selfVideo) {
  cameraBtn.addEventListener("click", function () {
    cameraBtn.classList.toggle("active");

    const icon = cameraBtn.querySelector("i");

    if (cameraBtn.classList.contains("active")) {
      icon.className = "fa-solid fa-video-slash";

      selfVideo.innerHTML = `
        <i class="fa-solid fa-video-slash"></i>
        <span>Camera off</span>
      `;
    } else {
      icon.className = "fa-solid fa-video";

      selfVideo.innerHTML = `
        <i class="fa-solid fa-user"></i>
        <span>You</span>
      `;
    }
  });
}

/* VIDEO SPEAKER */

const videoSpeakerBtn = document.getElementById("videoSpeakerBtn");

if (videoSpeakerBtn) {
  videoSpeakerBtn.addEventListener("click", function () {
    videoSpeakerBtn.classList.toggle("active");
  });
}


/* END VIDEO CALL */

const videoEndCallBtn = document.getElementById("videoEndCallBtn");

if (videoEndCallBtn) {
  videoEndCallBtn.addEventListener("click", function () {
    window.location.href = "chat.html";
  });
}
/* VIDEO CALL TIMER */

const videoCallStatus = document.getElementById("videoCallStatus");

if (videoCallStatus) {
  let videoSeconds = 0;

  setTimeout(function () {
    videoCallStatus.textContent = "Connected";
  }, 1500);

  setTimeout(function () {
    setInterval(function () {
      videoSeconds++;

      const minutes = Math.floor(videoSeconds / 60);
      const seconds = videoSeconds % 60;

      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(seconds).padStart(2, "0");

      videoCallStatus.textContent =
        formattedMinutes + ":" + formattedSeconds;

    }, 1000);
  }, 2500);
}
/* OPEN NEW CHAT */

const newChatBtn = document.getElementById("newChatBtn");
const newChatButton = document.querySelector(".new-chat");

if (newChatBtn) {
  newChatBtn.addEventListener("click", function () {
    window.location.href = "new-chat.html";
  });
}

if (newChatButton) {
  newChatButton.addEventListener("click", function () {
    window.location.href = "new-chat.html";
  });
}
/* NEW CHAT SEARCH */

const newChatSearch = document.getElementById("newChatSearch");
const people = document.querySelectorAll(".person-item");

if (newChatSearch) {
  newChatSearch.addEventListener("input", function () {
    const search = this.value.toLowerCase().trim();

    people.forEach(function (person) {
      const name = person.querySelector("h3").textContent.toLowerCase();

      if (name.includes(search)) {
        person.style.display = "flex";
      } else {
        person.style.display = "none";
      }
    });
  });
}
/* NEW GROUP */

const groupPeople = document.querySelectorAll(".group-person");
const selectedMembers = document.getElementById("selectedMembers");
const createGroupBtn = document.getElementById("createGroupBtn");
const groupNameInput = document.getElementById("groupName");

if (groupPeople.length && selectedMembers) {

  groupPeople.forEach(function (person) {

    const selectBtn = person.querySelector(".select-person");

    selectBtn.addEventListener("click", function () {

      person.classList.toggle("selected");

      const name = person.querySelector("h3").textContent;
      const image = person.querySelector("img").src;

      const existing = selectedMembers.querySelector(
        `[data-member="${name}"]`
      );

      if (person.classList.contains("selected")) {

        if (!existing) {
          const member = document.createElement("div");

          member.className = "selected-member";
          member.dataset.member = name;

          member.innerHTML = `
            <img src="${image}" alt="${name}">
            <span>${name}</span>
          `;

          selectedMembers.appendChild(member);
        }

      } else {

        if (existing) {
          existing.remove();
        }

      }

    });

  });

}


/* GROUP SEARCH */

const groupSearch = document.getElementById("groupSearch");

if (groupSearch) {

  groupSearch.addEventListener("input", function () {

    const search = this.value.toLowerCase().trim();

    groupPeople.forEach(function (person) {

      const name = person
        .querySelector("h3")
        .textContent
        .toLowerCase();

      person.style.display =
        name.includes(search) ? "flex" : "none";

    });

  });

}


/* CREATE GROUP */
if(createGroupBtn){
  createGroupBtn.addEventListener("click",function(){

    const groupName=groupNameInput.value.trim();
    const selected=document.querySelectorAll(".group-person.selected");

    if(groupName===""){
      alert("Please enter a group name.");
      groupNameInput.focus();
      return;
    }

    if(selected.length===0){
      alert("Please select at least one person.");
      return;
    }

    const members=Array.from(selected).map(function(person){
      return person.querySelector("h3").textContent;
    });

    const group={
      name:groupName,
      members:members,
      image:selected[0].querySelector("img").src,
      time:"Just now"
    };

    const savedGroups=JSON.parse(
      localStorage.getItem("buzzchatGroups") || "[]"
    );

    savedGroups.unshift(group);

    localStorage.setItem(
      "buzzchatGroups",
      JSON.stringify(savedGroups)
    );

    window.location.href="groups.html";
  });
}
/* LOAD SAVED GROUPS */

const groupList = document.querySelector(".group-list");

if(groupList){

  const savedGroups = JSON.parse(
    localStorage.getItem("buzzchatGroups") || "[]"
  );

  savedGroups.forEach(function(group){

    const groupItem = document.createElement("article");

    groupItem.className = "group-item";

    groupItem.innerHTML = `
      <div class="group-avatar">
        <img src="${group.image}" alt="${group.name}">
      </div>

      <div class="group-info">
        <h3>${group.name}</h3>
        <p>${group.members.length} member${group.members.length === 1 ? "" : "s"} · ${group.time}</p>
      </div>

      <div class="group-arrow">
        <i class="fa-solid fa-chevron-right"></i>
      </div>
    `;

    groupList.prepend(groupItem);

  });

}
/* OPEN SAVED GROUP CHAT */

document.addEventListener("click", function(event){

  const groupItem = event.target.closest(".group-item");

  if(!groupItem) return;

  const groupNameElement = groupItem.querySelector(".group-info h3");

  if(!groupNameElement) return;

  const groupName = groupNameElement.textContent.trim();

  localStorage.setItem("buzzchatActiveGroup", groupName);

  window.location.href = "chat.html";

});
/* CHAT MENU */

const chatMenuBtn = document.getElementById("chatMenuBtn");

if (chatMenuBtn) {

  chatMenuBtn.addEventListener("click", function () {

    const activeGroup =
      localStorage.getItem("buzzchatActiveGroup");

    if (activeGroup) {
      window.location.href = "group-info.html";
    } else {
      alert("Chat options coming soon.");
    }

  });

}
/* ADD MEMBERS */

const addMembersBtn =
  document.getElementById("addMembersBtn");

if (addMembersBtn) {

  addMembersBtn.addEventListener("click", function () {

    const activeGroup =
      localStorage.getItem("buzzchatActiveGroup");

    if (!activeGroup) {
      alert("No group selected.");
      return;
    }

    window.location.href = "add-members.html";

  });

}