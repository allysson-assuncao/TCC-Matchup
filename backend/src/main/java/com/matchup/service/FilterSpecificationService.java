package com.matchup.service;

import com.matchup.dto.SearchRequestDto;
import com.matchup.enums.LocalOperator;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FilterSpecificationService<T> {
    public Specification<T> getSearchSpecification(List<SearchRequestDto> searchRequestDtos, String orderBy, Sort.Direction direction){
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            int count = 0;
            for(SearchRequestDto requestDto: searchRequestDtos){
                List<Predicate> tempPredicates = new ArrayList<>();
                for(String value: requestDto.getValues()){
                    Predicate predicate = null;
                    switch (requestDto.getOperation()){
                        case EQUAL -> predicate  = criteriaBuilder.equal(root.get(requestDto.getColumn()), value);
                        case LIKE -> predicate  = criteriaBuilder.like(root.get(requestDto.getColumn()), "%"+value+"%");
                        case LOWER_THAN -> predicate  = criteriaBuilder.lessThanOrEqualTo(root.get(requestDto.getColumn()), value);
                        case GREATER_THAN -> predicate  = criteriaBuilder.greaterThanOrEqualTo(root.get(requestDto.getColumn()), value);
                        case JOIN -> predicate  = criteriaBuilder.equal(root.join(requestDto.getJoinTable()).get(requestDto.getColumn()), value);
                        default -> throw new IllegalStateException("Invalid Operation");
                    }
                    tempPredicates.add(predicate);
                }
                if(requestDto.getOperator().equals(LocalOperator.AND)){
                    predicates.add(criteriaBuilder.and(tempPredicates.toArray(new Predicate[0])));
                }else if (requestDto.getOperator().equals(LocalOperator.OR)){
                    count++;
                    System.out.println("OOOOOOOOOOOOORRRRRRRRRRRRRRR" + count);
                    predicates.add(criteriaBuilder.or(tempPredicates.toArray(new Predicate[0])));
                }else{
                    throw new IllegalArgumentException("Invalid Operator");
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
