package cz.netix.netixbackend.person;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/admin/persons")
public class PersonController {
    private static final String ACTIVE_MENU = "activeMenu";
    private static final String TITLE = "title";
    private static final String CONTENT = "content";
    private static final String PERSONS = "persons";
    private static final String LAYOUT = "_layout";
    private final PersonRepository repo;

    public PersonController(PersonRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public String list(Model model) {
        model.addAttribute(TITLE, "Persons");
        model.addAttribute(ACTIVE_MENU, PERSONS);
        model.addAttribute(CONTENT, "persons/list :: content");
        model.addAttribute(PERSONS, repo.findAll());
        return LAYOUT;
    }

    @GetMapping("/new")
    public String createForm(Model model) {
        model.addAttribute(TITLE, "New person");
        model.addAttribute(ACTIVE_MENU, PERSONS);
        model.addAttribute(CONTENT, "persons/form :: content");
        model.addAttribute("person", new Person());
        return LAYOUT;
    }

    @GetMapping("/{id}/edit")
    public String edit(@PathVariable Long id, Model model) {
        model.addAttribute(TITLE, "Edit person");
        model.addAttribute(ACTIVE_MENU, PERSONS);
        model.addAttribute(CONTENT, "persons/form :: content");
        if (id != null) {
            model.addAttribute("person", repo.findById(id).orElseThrow());
        }
        return LAYOUT;
    }

    @PostMapping("/save")
    public String save(@ModelAttribute Person person, RedirectAttributes ra) {
        if (person != null) {
            repo.save(person);
        }
        ra.addFlashAttribute("flashMsg", "Uloženo.");
        return "redirect:/admin/persons";
    }

    @PostMapping("/{id}/delete")
    public String delete(@PathVariable Long id, RedirectAttributes ra) {
        if (id != null) {
            repo.deleteById(id);
        }
        ra.addFlashAttribute("flashMsg", "Smazáno.");
        return "redirect:/admin/persons";
    }
}