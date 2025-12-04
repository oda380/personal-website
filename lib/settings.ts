export interface HomeSkill {
    iconName: string;
    title: string;
    description: string;
}

export interface Settings {
    github_url: string;
    twitter_url: string;
    linkedin_url: string;
    email: string;
    about_content: string;
    profile_image_url?: string;
    home_skills?: HomeSkill[];
}
