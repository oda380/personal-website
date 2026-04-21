import { getProjects, getPosts } from '../lib/db';
import { getInfographics } from '../lib/infographics';

async function testCounts() {
    try {
        const projects = await getProjects();
        console.log('Projects length:', projects.length);
    } catch (e) {
        console.error('Projects error:', e);
    }

    try {
        const posts = await getPosts();
        console.log('Posts length:', posts.length);
    } catch (e) {
        console.error('Posts error:', e);
    }

    try {
        const infographics = await getInfographics();
        console.log('Infographics length:', infographics.length);
    } catch (e) {
        console.error('Infographics error:', e);
    }
}

testCounts();
