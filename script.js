
    const startMenuToggle = document.getElementById('startMenuToggle');
    const startMenu = document.getElementById('startMenu');
    const aboutWindow = document.getElementById('aboutWindow');
    const Profile = document.getElementById('Profile');
    const profileWindow = document.getElementById('profileWindow');

    document.addEventListener('click', (e) => {
        if (!startMenuToggle.contains(e.target) && !startMenu.contains(e.target)) {
            startMenuClose();
        }
    });

    const toggleStartMenu = () => {
        if (startMenuToggle.classList.contains('active') || startMenu.classList.contains('active')) {
            startMenuClose();
        } else {
            startMenuOpen();
        }
    }

    const startMenuClose = () => {
        startMenuToggle.classList.remove('active');
        startMenu.classList.remove('active');
    }

    const startMenuOpen = () => {
        startMenuToggle.classList.add('active');
        startMenu.classList.add('active');
    }

    const openWindow = (windowId) => {
        resetTabs();

        const window = document.getElementById(windowId);
        const windowTab = document.getElementById(windowId + 'Tab');

        dragElement(window);
        !window.classList.contains('active') && window.classList.add('active');
        !window.classList.contains('visible') && window.classList.add('visible');
        !windowTab.classList.contains('active') && windowTab.classList.add('active');
        !windowTab.classList.contains('current') && windowTab.classList.add('current');
        bringFront(windowId);
    }

    const closeWindow = (windowId) => {
        const window = document.getElementById(windowId);
        const windowTab = document.getElementById(windowId + 'Tab');

        window.classList.contains('active') && window.classList.remove('active');
        window.classList.contains('visible') && window.classList.remove('visible');
        windowTab.classList.contains('active') && windowTab.classList.remove('active');
        windowTab.classList.contains('current') && windowTab.classList.remove('current');
    }

    const minimizeWindow = (windowId) => {
        const window = document.getElementById(windowId);
        const windowTab = document.getElementById(windowId + 'Tab');

        window.classList.remove('visible');
        windowTab.classList.remove('current');
    }

    const maximizeWindow = (windowId) => {
        const window = document.getElementById(windowId);
        const windowTab = document.getElementById(windowId + 'Tab');

        bringFront(windowId);

        if (window.classList.contains('maximize')) {
            window.classList.remove('maximize');
        } else {
            window.classList.add('maximize');
        }

        !windowTab.classList.contains('current') && windowTab.classList.add('current');
    }

    const tabClick = (windowId) => {
        const windowTab = document.getElementById(windowId + 'Tab');

        if (!windowTab.classList.contains('current')) {
            openWindow(windowId);
        }
    }

    const bringFront = (windowId) => {
        const window = document.getElementById(windowId);

        resetWindows();
        window.style.zIndex = 1;
    }

    const resetWindows = () => {
        const windows = document.getElementsByClassName('window');

        for (let i = 0; i < windows.length; i++) {
            windows[i].style.zIndex = 0;
        }
    }

    const resetTabs = () => {
        const tabs = document.getElementsByClassName('current');

        for (let i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove('current');
        }
    }

    function dragElement(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        const header = document.getElementById(elmnt.id + "Header");
        if (header) {
            header.onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            resetTabs();
            document.getElementById(elmnt.id + 'Tab').classList.add('current');
            bringFront(elmnt.id);

            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
