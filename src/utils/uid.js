let component_counter = 0

export default function useUniqueId() {
    const unique_id = component_counter
    component_counter += 1
    return unique_id
};
