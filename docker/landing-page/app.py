from flask import Flask, render_template, send_from_directory, request, jsonify
import os

app = Flask(
    __name__,
    template_folder='landing_page',
    static_folder='landing_page/layout/assets',
    static_url_path='/assets'
)

@app.route('/')
def index():
    return render_template('pages/parenting.html')

@app.route('/parenting')
def parenting():
    return render_template('pages/parenting.html')

# Handle form submission
@app.route('/submit-lead', methods=['POST'])
def submit_lead():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    project = data.get('project')
    
    # Log the lead (in production, you'd save this to a database or send to a CRM)
    print(f"New lead: {name} - {email}")
    print(f"Challenge: {project}")
    
    return jsonify({'success': True, 'message': 'Lead received'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True, extra_files=[
        'landing_page/layout/base.html',
        'landing_page/layout/header.html',
        'landing_page/layout/footer.html',
        'landing_page/pages/parenting.html',
        'landing_page/layout/assets/css/style.css',
        'landing_page/layout/assets/js/script.js',
    ])
