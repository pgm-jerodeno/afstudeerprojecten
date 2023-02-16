(() => {
  const app = {
    init() {
      console.log('1. Application Initialized!');
      this.cacheElements();
      this.generateUI();
    },
    cacheElements() {
      console.log('2. Cache the elements!');
      this.$nav = document.querySelector('nav');
      this.$events = document.querySelector('.events');
      this.$countUp = document.querySelector('.count-up');
      this.$countDown = document.querySelector('.count-down');
      this.$projectsContainer = document.querySelector('.projects-container');
      this.$projectDetails = document.querySelector('.project-details');
      this.$projectDetailsWrapper = document.querySelector('.project-details-wrapper');
      this.$closeButton = document.querySelector('.close-button');
      this.$socials = document.querySelector('.socials');
      this.$disclaimer = document.querySelector('.disclaimer');
    },
    generateUI() {
      console.log('3. Generate User Interface!');
      this.$nav.innerHTML = this.generateNavigation();
      this.$events.innerHTML = this.generateEvents();
      setInterval(() => this.ticking(), 1000);
      this.$projectsContainer.innerHTML = this.generateProjectCard();
      this.$socials.innerHTML = this.generateSocials();
      this.$disclaimer.innerHTML = this.generateDisclaimer();

      const $projects = this.$projectsContainer.querySelectorAll('.project');
      $projects.forEach(($project) => {
        $project.addEventListener('click', (ev) => {
          const elem = ev.currentTarget;
          const id = elem.dataset.id;
          const project = projects.find((project) => project.id === id);
          this.$projectDetails.innerHTML = this.generateProjectDetails(project);
          this.$projectDetailsWrapper.classList.toggle('isopen');
        })
      });

      this.$closeButton.addEventListener('click', () => {
        this.$projectDetailsWrapper.classList.toggle('isopen');
      });
    },
    generateNavigation() {
      let output = '';
      for (elem of navigation) {
        if (elem.type == 'internal') {
          output += `<a href="${elem.link}">${elem.name}</a>`;
        } else {
          output += `<a href="${elem.link}" target="_blank">${elem.name}</a>`;
        }
      }
      return output;
    },
    generateEvents() {
      let output = '<ul>';
      for (elem of events) {
        output += `<li><a href="${elem.link}" target="_blank">${elem.title}</a></li>`;
      }
      output += '</ul>';
      return output;
    },
    generateCountUp() {
      const countUpEnd = Math.floor(Date.now()/1000);
      const countUp = countUpEnd - (countUpStart/1000);

      const day = this.setToAmountOfDigits(Math.floor(countUp / (24*60*60)), 3);
      const remainDay = countUp % (24*60*60);
      const hour = this.setToAmountOfDigits(Math.floor(remainDay / (60*60)), 2);
      const remainHour = remainDay % (60*60);
      const minute = this.setToAmountOfDigits(Math.floor(remainHour / 60), 2);
      const remainMinute = this.setToAmountOfDigits((remainHour % 60), 2);
      const output = `<div class="clock-container"><p class="clock">${day}days ${hour}h ${minute}m ${remainMinute}s</p><p>running in current academic year 2022-23</p></div>`;
      return output;
    },
    generateCountDown() {
      const countDownStart = Math.floor(Date.now()/1000);
      const countDown = (countDownEnd/1000) - countDownStart;

      const day = this.setToAmountOfDigits(Math.floor(countDown / (24*60*60)), 3);
      const remainDay = countDown % (24*60*60);
      const hour = this.setToAmountOfDigits(Math.floor(remainDay / (60*60)), 2);
      const remainHour = remainDay % (60*60);
      const minute = this.setToAmountOfDigits(Math.floor(remainHour / 60), 2);
      const remainMinute = this.setToAmountOfDigits((remainHour % 60), 2);
      const output = `<div class="clock-container"><p class="clock">${day}days ${hour}h ${minute}m ${remainMinute}s</p><p>running in current academic year 2023-24</p></div>`;
      return output;
    },
    setToAmountOfDigits(number, amount) {
      number = number.toString();
      const numberLength = number.length;
      if (numberLength < amount) {
        for (let i = 0; i < (amount - numberLength); i++) {
          number = '0' + number;
        }
      }
      return number;
    },
    ticking() {
      this.$countUp.innerHTML = this.generateCountUp();
      this.$countDown.innerHTML = this.generateCountDown();
    },
    generateProjectCard() {
      let output = '';
      for (project of projects) {
        output += `<article class="project" data-id="${project.id}">
        <div class="picture"><img src="${project.screenshots[0]}" alt="${project.title} screenshot"></img></div>
        <p>${project.author.firstName} ${project.author.lastName}</p>
        <h2>${project.title}</h2>
        <ul>
        <li>${project.technologies[0].name}</li>
        <li>${project.technologies[1].name}</li>
        </ul>
        </article>`;
      }
      return output;
    },
    generateProjectDetails(p) {
      let output = '';
      output += `<div class="pictures">${this.generatePictures(p.screenshots)}</div>
      <p>${p.author.firstName} ${p.author.lastName}</p>
      <h2>${p.title}</h2>
      <ul>
      <li>${p.technologies[0].name}</li>
      <li>${p.technologies[1].name}</li>
      </ul>
      <p>${p.synopsis}</p>`
      return output;
    },
    generatePictures(screenshots) {
      let output = '';
      let index = 1;
      for (screenshot of screenshots) {
        output += `<img src="${screenshot}" alt="screenshot ${index}"></img>`;
        index++;
      }
      return output;
    },
    generateSocials() {
      return `<ul>
      <li><a href="${socials.website}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg></a></li>
      <li><a href="${socials.linkedin}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg></a></li>
      <li><a href="${socials.facebook}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg></a></li>
      <li><a href="${socials.instagram}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg></a></li>
      <li><a href="${socials.youtube}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg></a></li>
      </ul>`
    },
    generateDisclaimer() {
      const date = new Date();
      const year = date.getFullYear();
      let output = `Copyright ${year} © Associate Degree in Computer Programming | Artevelde University of Applied Sciences | Disclaimer`;
      return output;
    },
  };
  app.init();
})();