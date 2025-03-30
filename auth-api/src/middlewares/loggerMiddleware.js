import morgan from 'morgan';

export function httpLogger() {
    const env = process.env.NODE_ENV || 'development';

    switch (env) {
        case 'production':
            return morgan('combined');
        case 'development':
            return morgan('dev');
        case 'test':
            return morgan('tiny');
        default:
            return morgan('common');
    }
}