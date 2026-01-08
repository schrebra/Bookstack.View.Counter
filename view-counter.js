(function() {
    console.log("View Counter: Script Loaded");

    function injectViewCounter() {
        const path = window.location.pathname;
        
        // Ensure we are on a page
        if (!path.includes('/pages/')) {
            console.log("View Counter: Not a page, skipping.");
            return;
        }

        const slug = path.split('/').pop();
        console.log("View Counter: Fetching count for " + slug);

        fetch(`/counter.php?page_id=${slug}`, { 
            cache: "no-store",
            mode: 'same-origin'
        })
        .then(response => response.text())
        .then(count => {
            console.log("View Counter: Received count " + count);
            
            // Try to find the target element with a retry loop
            let attempts = 0;
            const findAndInject = setInterval(() => {
                const target = document.querySelector('.page-content h1') || 
                               document.querySelector('.tag-display') ||
                               document.querySelector('.page-header');
                
                attempts++;

                if (target) {
                    clearInterval(findAndInject);
                    
                    const old = document.getElementById('bookstack-view-counter');
                    if (old) old.remove();

                    const container = document.createElement('div');
                    container.id = 'bookstack-view-counter';
                    container.style.cssText = "display:inline-flex; align-items:center; color:#666; font-size:0.85em; margin:10px 0; padding:4px 8px; background:#f4f4f4; border-radius:4px; border:1px solid #ddd; z-index:999; position:relative;";
                    
                    container.innerHTML = `
                        <svg style="width:16px;height:16px;margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        <span>${count} Views</span>
                    `;

                    target.insertAdjacentElement('afterend', container);
                    console.log("View Counter: Successfully injected into DOM");
                }

                if (attempts > 50) { // Stop trying after 5 seconds
                    clearInterval(findAndInject);
                    console.log("View Counter: Could not find a place to inject after 50 tries.");
                }
            }, 100);
        })
        .catch(err => console.error("View Counter: Fetch Error:", err));
    }

    // BookStack Event Listeners
    window.addEventListener('load', injectViewCounter);
    document.addEventListener('common:navigated', injectViewCounter);
})();
