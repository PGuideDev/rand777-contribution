document.addEventListener('DOMContentLoaded', function () {
    // 在此处添加页面交互逻辑
    const projects = document.querySelectorAll('.project');
    projects.forEach(function (project) {
        project.addEventListener('click', function () {
            // 移除所有项目的高亮状态
            projects.forEach(function (proj) {
                proj.classList.remove('highlight');
            });
            // 为当前点击的项目添加高亮状态
            project.classList.add('highlight');
            console.log('当前选中项目:', project.querySelector('h3').textContent);
        });
    });

    // 添加3D场景切换控制
    const toggleButton = document.getElementById('toggle-threejs');
    const container = document.getElementById('threejs-container');
    let isFullscreen = false;

    toggleButton.addEventListener('click', function () {
        isFullscreen = !isFullscreen;
        if (isFullscreen) {
            container.classList.add('fullscreen');
            toggleButton.textContent = '返回正常视图';
        } else {
            container.classList.remove('fullscreen');
            toggleButton.textContent = '切换3D背景';
        }
    });
});